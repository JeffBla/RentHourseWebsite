-- SQLBook: Code
SELECT r.title, r.coming_from, r.price_permonth, r.url, i_cover.url AS img_url
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m
WHERE
    ${joinTableCondStr:value}
LIMIT ${limit:value}