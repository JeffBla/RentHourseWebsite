SELECT r.id, r.title, r.coming_from,
     r.price_permonth, r.url,
      i_cover.url AS img_url
FROM
    rent_info AS r,
    rent_search_info AS rs,
    image AS i_cover,
    house AS h,
    rentinfo_user AS u,
    favorite AS f
WHERE
    r.house_id=h.id AND
    r.id=rs.rent_info_id AND
    i_cover.id=r.image_id_cover AND
    u.id=f.user_id AND f.rent_info_id=r.id AND
    u.id=${userId:value}
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value} OFFSET ${offect:value}