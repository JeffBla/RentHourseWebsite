-- SQLBook: Code
SELECT r.id, r.title, rs.coming_from,
     rs.price_permonth, r.url,
      i_cover.url AS img_url
FROM
    rent_info AS r,
    rent_search_info AS rs,
    image AS i_cover,
    house AS h
WHERE
    r.house_id=h.id AND
    r.id=rs.rent_info_id AND
    i_cover.id=r.image_cover_id
    ${searchCondStr:raw}
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value} OFFSET ${offect:value}