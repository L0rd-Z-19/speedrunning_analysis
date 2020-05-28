DROP TABLE IF EXISTS games;

CREATE TABLE games (
  Rank INT,
  Name VARCHAR,
  Platform VARCHAR,
  Year VARCHAR,
  Genre VARCHAR,
  Publisher VARCHAR,
  NA_Sales FLOAT,
  EU_Sales FLOAT,
  JP_Sales FLOAT,
  Other_Sales FLOAT,
  Global_Sales FLOAT
);

SELECT *
FROM games;