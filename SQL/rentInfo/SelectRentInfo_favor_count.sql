SELECT COUNT(*) AS like_cnt
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    rentinfo_user AS u,
    favorite AS f
WHERE
    r.house_id=h.id AND
    i_cover.id=r.image_id_cover AND
    u.id=f.user_id AND f.user_id=r.id AND
    u.id=${userId:value}