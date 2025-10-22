import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Cards() {
  const cardItems = [
    {
      id: 1,
      title: "Teachers",
      date: "2025-2026",
      number: "42",
      color: "violet",
    },
    {
      id: 2,
      title: "Students",
      date: "2025-2026",
      number: "330",
      color: "indigo",
    },
    {
      id: 3,
      title: "Parents",
      date: "2025-2026",
      number: "602",
      color: "violet",
    },
    {
      id: 4,
      title: "Staffs",
      date: "2025-2026",
      number: "53",
      color: "indigo",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cardItems.map((item) => (
        <Card
          key={item.id}
          className={
            item.color === "violet"
              ? "bg-violet-300"
              : item.color === "indigo"
              ? "bg-indigo-200"
              : "bg-white"
          }
          sx={{
            width: "100%",
            height: "100%",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 14,
                backgroundColor: "white",
                width: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              {item.date}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ my: 2, fontWeight: "bold" }}
            >
              {item.number}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
