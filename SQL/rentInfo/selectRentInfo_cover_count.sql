SELECT COUNT(*) AS item_cnt
FROM rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m
WHERE
    r.house_id=h.id AND
    h.map_object_id=m.id AND
    i_cover.id=r.image_id_cover
    ${searchCondStr:raw}