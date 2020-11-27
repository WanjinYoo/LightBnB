const db = require('../db');
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
  SELECT * 
  FROM users
  WHERE email = $1`,[email])
    .then((res) => {
      if (!res) {
        return null;
      }
      return res.rows[0];
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`
  SELECT * 
  FROM users
  WHERE id = $1`,[id])
    .then((res) => {
      if (!res) {
        return null;
      }
      return res.rows[0];
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;

  return db.query(`
    INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *
  `,[name,email,password])
    .then((res) => {
      return res.rows[0];
    });
};
exports.addUser = addUser;

const addReservation = function (reservation) {
  const start_date = reservation.start_date;
  const end_date = reservation.end_date;
  const property_id = reservation.property_id;
  const guest_id = reservation.guest_id;

  return db.query(`
    INSERT INTO reservations (start_date,end_date,property_id,guest_id) VALUES ($1,$2,$3,$4) RETURNING *
  `,[start_date,end_date,property_id,guest_id])
    .then((res) => {
      console.log(res);
      return res.rows[0];
    });
};
exports.addReservation = addReservation;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`
  SELECT * FROM reservations
  JOIN properties
  on properties.id = reservations.property_id
  JOIN property_reviews
  on property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $2
  LIMIT $1
  `, [limit,guest_id])
    .then(res => {
      return res.rows;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1

  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;

  // 3
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND properties.cost_per_night > $${queryParams.length - 1} AND properties.cost_per_night < $${queryParams.length}`;
  }
  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `AND property_reviews.rating >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;


  // 6
  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [];
  for (const items of Object.keys(property)) {
    queryParams.push(property[items]);
  }


  return db.query(`
    INSERT INTO properties (title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,street,city,province,post_code,country,parking_spaces,number_of_bathrooms,number_of_bedrooms,owner_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *
  `,queryParams)
    .then((res) => {
      return res.rows[0];
    });
};
exports.addProperty = addProperty;
