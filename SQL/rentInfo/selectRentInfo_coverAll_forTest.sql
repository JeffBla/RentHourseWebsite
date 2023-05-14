-- SQLBook: Code
SELECT *
FROM
    rent_info AS r,
    image AS i_cover,
    house AS h,
    map_object AS m
WHERE
    ${joinTableCondStr:value}
ORDER BY ${orderRefer:raw} ${orderMode:value}
LIMIT ${limit:value}