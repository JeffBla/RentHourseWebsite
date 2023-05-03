SELECT *
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m,
    image AS i
WHERE
    ${joinTableCondStr:value}
LIMIT ${limit:value}