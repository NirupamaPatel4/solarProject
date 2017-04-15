CREATE TABLE LiveSolarSystem
(
    Id    serial primary key,
    solarSystemId int not null,
    date        date not null,
    dcPower     float not null
);

