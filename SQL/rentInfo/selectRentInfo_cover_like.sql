SELECT id, title, coming_from, price_permonth, url, img_url,
        CASE WHEN user_favor_rentid is NOT NULL THEN TRUE
            ELSE FALSE
        END
         AS "like"
FROM (
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
    ) AS cover_rent_info
LEFT JOIN (
    SELECT r.id AS user_favor_rentid
    FROM rentinfo_user AS u, favorite AS f, rent_info AS r
    WHERE u.id=f.user_id AND f.rent_info_id=r.id
        AND u.id=${user_id:value}
) AS user_favor_rent 
    ON user_favor_rent.user_favor_rentid=cover_rent_info.id
