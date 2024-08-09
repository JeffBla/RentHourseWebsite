SELECT COUNT(*) AS item_cnt
FROM rent_info AS r,
    rent_search_info AS rs,
    image AS i_cover,
    house AS h
WHERE
    r.house_id=h.id AND
    i_cover.id=r.image_cover_id AND
    rs.rent_info_id=r.id 
    ${searchCondStr:raw}