db.createUser(
  {
    user: "fms",
    pwd: "pass",
    roles: [
      {
        role: "readWrite",
        db: "fms",
      },
    ],
  },
);