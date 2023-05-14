SELECT COUNT(*) AS like_cnt
FROM rentinfo_user AS u, favorite AS f, rent_info AS r
WHERE u.id=f.user_id AND f.rent_info_id=r.id
    AND u.id=${user_id:value}