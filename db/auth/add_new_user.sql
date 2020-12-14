INSERT INTO puppygram_user2(username, hash, is_admin)
VALUES ($1, $2, $3)
RETURNING *;