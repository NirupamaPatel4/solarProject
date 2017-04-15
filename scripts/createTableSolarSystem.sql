CREATE TABLE SolarSystem
(
    Id    serial primary key,
    latitude        float not null,
    longitude       float  not null,
    capacity	    int not null,
    dcPower         varchar not null
);