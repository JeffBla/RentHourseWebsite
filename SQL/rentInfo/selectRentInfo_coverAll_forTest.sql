-- SQLBook: Code
SELECT *
FROM
    rent_info AS r,
    rent_search_info AS rs,
    image AS i_cover,
    house AS h
WHERE
    r.house_id=h.id AND
    r.id=rs.rent_info_id AND
    i_cover.id=r.image_id_cover
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value}