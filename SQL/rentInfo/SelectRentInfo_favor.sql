SELECT r.id, r.title, r.coming_from,
     r.price_permonth, r.url,
      i_cover.url AS img_url
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m,
    rentinfo_user AS u,
    favorite AS f
WHERE
    r.house_id=h.id AND
    h.map_object_id=m.id AND
    i_cover.id=r.image_id_cover AND
    u.id=f.user_id AND f.rent_info_id=r.id AND
    u.id=${userId:value}
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value} OFFSET ${offect:value}