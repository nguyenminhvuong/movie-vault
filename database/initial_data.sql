-- This script populates the Country, Genre, and Language tables with initial data.
INSERT INTO Country (name) VALUES
('Afghanistan'), ('Albania'), ('Algeria'), ('Andorra'), ('Angola'),
('Antigua and Barbuda'), ('Argentina'), ('Armenia'), ('Australia'), ('Austria'),
('Azerbaijan'), ('Bahamas'), ('Bahrain'), ('Bangladesh'), ('Barbados'),
('Belarus'), ('Belgium'), ('Belize'), ('Benin'), ('Bhutan'),
('Bolivia'), ('Bosnia and Herzegovina'), ('Botswana'), ('Brazil'), ('Brunei'),
('Bulgaria'), ('Burkina Faso'), ('Burundi'), ('Cabo Verde'), ('Cambodia'),
('Cameroon'), ('Canada'), ('Central African Republic'), ('Chad'), ('Chile'),
('China'), ('Colombia'), ('Comoros'), ('Congo'), ('Costa Rica'),
('Croatia'), ('Cuba'), ('Cyprus'), ('Czech Republic'), ('Denmark'),
('Djibouti'), ('Dominica'), ('Dominican Republic'), ('Ecuador'), ('Egypt'),
('El Salvador'), ('Equatorial Guinea'), ('Eritrea'), ('Estonia'), ('Eswatini'),
('Ethiopia'), ('Fiji'), ('Finland'), ('France'), ('Gabon'),
('Gambia'), ('Georgia'), ('Germany'), ('Ghana'), ('Greece'),
('Grenada'), ('Guatemala'), ('Guinea'), ('Guyana'), ('Haiti'),
('Honduras'), ('Hungary'), ('Iceland'), ('India'), ('Indonesia'),
('Iran'), ('Iraq'), ('Ireland'), ('Israel'), ('Italy'),
('Jamaica'), ('Japan'), ('Jordan'), ('Kazakhstan'), ('Kenya'),
('Kiribati'), ('Kuwait'), ('Kyrgyzstan'), ('Laos'), ('Latvia'),
('Lebanon'), ('Lesotho'), ('Liberia'), ('Libya'), ('Liechtenstein'),
('Lithuania'), ('Luxembourg'), ('Madagascar'), ('Malawi'), ('Malaysia'),
('Vietnam');

INSERT INTO Genre (name) VALUES
 ('Action'), ('Adult'), ('Adventure'), ('Animation'), ('Biography'), ('Comedy'),
 ('Crime'), ('Documentary'), ('Drama'), ('Family'), ('Fantasy'), ('Film-Noir'),
 ('Game-Show'), ('History'), ('Horror'), ('Music'), ('Musical'), ('Mystery'),
 ('News'), ('Reality-TV'), ('Romance'), ('Sci-Fi'), ('Short'), ('Sport'), ('Talk-Show'),
 ('Thriller'), ('War'), ('Western'), ('Superhero'), ('Psychological'), ('Slasher'),
 ('Martial Arts'), ('Spy'), ('Disaster'), ('Heist'), ('Satire'), ('Parody'),
 ('Mockumentary'), ('Cyberpunk'), ('Dystopian'), ('Post-Apocalyptic'), ('Space-Opera'),
 ('Period-Piece'), ('Experimental');

INSERT INTO Language (name) VALUES
('English'), ('Mandarin Chinese'), ('Spanish'), ('Hindi'),
('Arabic'), ('Portuguese'), ('Bengali'), ('Russian'), ('Japanese'),
('German'), ('Korean'), ('French'), ('Italian'), ('Vietnamese');