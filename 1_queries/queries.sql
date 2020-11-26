SELECT id,name,email,password
FROM users
WHERE email = 'tristanjacobs@gmail.com';

SELECT AVG(end_date - start_date)
FROM reservations;


SELECT properties.id,title,cost_per_night,AVG(property_reviews.rating)
FROM properties
JOIN property_reviews
ON properties.id = property_reviews.property_id
WHERE city LIKE '%ancouv%'
group by properties.id
HAVING AVG(property_reviews.rating) >= 4
order by cost_per_night;

SELECT properties.city, count(*)
FROM properties
JOIN reservations
ON properties.id = reservations.property_id
group by properties.city
Order by count(*) DESC;

SELECT properties.id,title,cost_per_night,reservations.start_date,AVG(property_reviews.rating)
FROM properties
JOIN property_reviews
ON properties.id = property_reviews.property_id
JOIN reservations
ON reservations.property_id = properties.id
WHERE reservations.end_date < NOW()::date AND reservations.guest_id = 1
group by properties.id,reservations.id
order by cost_per_night
LIMIT 10;

SELECT properties.id,title,cost_per_night,reservations.start_date,AVG(property_reviews.rating)
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;