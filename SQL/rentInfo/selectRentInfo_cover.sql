-- SQLBook: Code
SELECT r.id, r.title, r.coming_from,
     r.price_permonth, r.url,
      i_cover.url AS img_url
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m
WHERE
    r.house_id=h.id AND
    h.map_object_id=m.id AND
    i_cover.id=r.image_id_cover
    ${searchCondStr:raw}
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value} OFFSET ${offect:value}