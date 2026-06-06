-- ============================================================
-- POLLA MUNDIAL 2026 — PLANTILLAS DE JUGADORES
-- Fuente: nóminas oficiales (Wikipedia) por selección.
-- Posición: GK / DEF / MID / FWD.
-- Reemplaza toda la tabla de jugadores.
-- ============================================================

TRUNCATE TABLE public.players RESTART IDENTITY;

-- ===================== GRUPO A =====================
-- México
INSERT INTO public.players (team, name, position) VALUES
('México','Raúl Rangel','GK'),
('México','Carlos Acevedo','GK'),
('México','Guillermo Ochoa','GK'),
('México','Jorge Sánchez','DEF'),
('México','César Montes','DEF'),
('México','Edson Álvarez','DEF'),
('México','Johan Vásquez','DEF'),
('México','Israel Reyes','DEF'),
('México','Mateo Chávez','DEF'),
('México','Jesús Gallardo','DEF'),
('México','Érik Lira','MID'),
('México','Luis Romo','MID'),
('México','Álvaro Fidalgo','MID'),
('México','Orbelín Pineda','MID'),
('México','Obed Vargas','MID'),
('México','Gilberto Mora','MID'),
('México','Luis Chávez','MID'),
('México','Brian Gutiérrez','MID'),
('México','Raúl Jiménez','FWD'),
('México','Alexis Vega','FWD'),
('México','Santiago Giménez','FWD'),
('México','Armando González','FWD'),
('México','Julián Quiñones','FWD'),
('México','César Huerta','FWD'),
('México','Guillermo Martínez','FWD'),
('México','Roberto Alvarado','FWD');

-- Sudáfrica
INSERT INTO public.players (team, name, position) VALUES
('Sudáfrica','Ronwen Williams','GK'),
('Sudáfrica','Sipho Chaine','GK'),
('Sudáfrica','Ricardo Goss','GK'),
('Sudáfrica','Thabang Matuludi','DEF'),
('Sudáfrica','Khulumani Ndamane','DEF'),
('Sudáfrica','Aubrey Modiba','DEF'),
('Sudáfrica','Mbekezeli Mbokazi','DEF'),
('Sudáfrica','Samukele Kabini','DEF'),
('Sudáfrica','Nkosinathi Sibisi','DEF'),
('Sudáfrica','Khuliso Mudau','DEF'),
('Sudáfrica','Ime Okon','DEF'),
('Sudáfrica','Olwethu Makhanya','DEF'),
('Sudáfrica','Bradley Cross','DEF'),
('Sudáfrica','Teboho Mokoena','MID'),
('Sudáfrica','Thalente Mbatha','MID'),
('Sudáfrica','Themba Zwane','MID'),
('Sudáfrica','Sphephelo Sithole','MID'),
('Sudáfrica','Jayden Adams','MID'),
('Sudáfrica','Oswin Appollis','FWD'),
('Sudáfrica','Tshepang Moremi','FWD'),
('Sudáfrica','Lyle Foster','FWD'),
('Sudáfrica','Relebohile Mofokeng','FWD'),
('Sudáfrica','Thapelo Maseko','FWD'),
('Sudáfrica','Iqraam Rayners','FWD'),
('Sudáfrica','Evidence Makgopa','FWD'),
('Sudáfrica','Kamogelo Sebelebele','FWD');

-- Corea del Sur
INSERT INTO public.players (team, name, position) VALUES
('Corea del Sur','Kim Seung-gyu','GK'),
('Corea del Sur','Song Bum-keun','GK'),
('Corea del Sur','Jo Hyeon-woo','GK'),
('Corea del Sur','Lee Han-beom','DEF'),
('Corea del Sur','Kim Min-jae','DEF'),
('Corea del Sur','Kim Tae-hyeon','DEF'),
('Corea del Sur','Lee Tae-seok','DEF'),
('Corea del Sur','Cho Wi-je','DEF'),
('Corea del Sur','Kim Moon-hwan','DEF'),
('Corea del Sur','Park Jin-seob','DEF'),
('Corea del Sur','Seol Young-woo','DEF'),
('Corea del Sur','Jens Castrop','DEF'),
('Corea del Sur','Lee Gi-hyuk','MID'),
('Corea del Sur','Hwang In-beom','MID'),
('Corea del Sur','Paik Seung-ho','MID'),
('Corea del Sur','Lee Jae-sung','MID'),
('Corea del Sur','Hwang Hee-chan','MID'),
('Corea del Sur','Bae Jun-ho','MID'),
('Corea del Sur','Lee Kang-in','MID'),
('Corea del Sur','Yang Hyun-jun','MID'),
('Corea del Sur','Kim Jin-gyu','MID'),
('Corea del Sur','Eom Ji-sung','MID'),
('Corea del Sur','Lee Dong-gyeong','MID'),
('Corea del Sur','Son Heung-min','FWD'),
('Corea del Sur','Cho Gue-sung','FWD'),
('Corea del Sur','Oh Hyeon-gyu','FWD');

-- Rep. Checa
INSERT INTO public.players (team, name, position) VALUES
('Rep. Checa','Matěj Kovář','GK'),
('Rep. Checa','Jindřich Staněk','GK'),
('Rep. Checa','Lukáš Horníček','GK'),
('Rep. Checa','David Zima','DEF'),
('Rep. Checa','Tomáš Holeš','DEF'),
('Rep. Checa','Robin Hranáč','DEF'),
('Rep. Checa','Vladimír Coufal','DEF'),
('Rep. Checa','Štěpán Chaloupek','DEF'),
('Rep. Checa','Ladislav Krejčí','DEF'),
('Rep. Checa','David Jurásek','DEF'),
('Rep. Checa','Jaroslav Zelený','DEF'),
('Rep. Checa','David Douděra','DEF'),
('Rep. Checa','Vladimír Darida','MID'),
('Rep. Checa','Lukáš Červ','MID'),
('Rep. Checa','Lukáš Provod','MID'),
('Rep. Checa','Michal Sadílek','MID'),
('Rep. Checa','Tomáš Souček','MID'),
('Rep. Checa','Alexandr Sojka','MID'),
('Rep. Checa','Hugo Sochůrek','MID'),
('Rep. Checa','Adam Hložek','FWD'),
('Rep. Checa','Patrik Schick','FWD'),
('Rep. Checa','Jan Kuchta','FWD'),
('Rep. Checa','Mojmír Chytil','FWD'),
('Rep. Checa','Pavel Šulc','FWD'),
('Rep. Checa','Tomáš Chorý','FWD'),
('Rep. Checa','Denis Višinský','FWD');

-- ===================== GRUPO B =====================
-- Suiza
INSERT INTO public.players (team, name, position) VALUES
('Suiza','Gregor Kobel','GK'),('Suiza','Yvon Mvogo','GK'),('Suiza','Marvin Keller','GK'),
('Suiza','Miro Muheim','DEF'),('Suiza','Silvan Widmer','DEF'),('Suiza','Nico Elvedi','DEF'),
('Suiza','Manuel Akanji','DEF'),('Suiza','Ricardo Rodriguez','DEF'),('Suiza','Eray Cömert','DEF'),
('Suiza','Aurèle Amenda','DEF'),('Suiza','Luca Jaquez','DEF'),('Suiza','Denis Zakaria','MID'),
('Suiza','Remo Freuler','MID'),('Suiza','Johan Manzambi','MID'),('Suiza','Granit Xhaka','MID'),
('Suiza','Ardon Jashari','MID'),('Suiza','Djibril Sow','MID'),('Suiza','Michel Aebischer','MID'),
('Suiza','Fabian Rieder','MID'),('Suiza','Breel Embolo','FWD'),('Suiza','Dan Ndoye','FWD'),
('Suiza','Christian Fassnacht','FWD'),('Suiza','Rubén Vargas','FWD'),('Suiza','Noah Okafor','FWD'),
('Suiza','Zeki Amdouni','FWD'),('Suiza','Cedric Itten','FWD');

-- Canadá
INSERT INTO public.players (team, name, position) VALUES
('Canadá','Dayne St. Clair','GK'),('Canadá','Maxime Crépeau','GK'),('Canadá','Owen Goodman','GK'),
('Canadá','Alistair Johnston','DEF'),('Canadá','Alfie Jones','DEF'),('Canadá','Luc de Fougerolles','DEF'),
('Canadá','Joel Waterman','DEF'),('Canadá','Derek Cornelius','DEF'),('Canadá','Moïse Bombito','DEF'),
('Canadá','Alphonso Davies','DEF'),('Canadá','Richie Laryea','DEF'),('Canadá','Niko Sigur','DEF'),
('Canadá','Mathieu Choinière','MID'),('Canadá','Stephen Eustáquio','MID'),('Canadá','Ismaël Koné','MID'),
('Canadá','Liam Millar','MID'),('Canadá','Jacob Shaffelburg','MID'),('Canadá','Jonathan Osorio','MID'),
('Canadá','Nathan Saliba','MID'),('Canadá','Cyle Larin','FWD'),('Canadá','Jonathan David','FWD'),
('Canadá','Tani Oluwaseyi','FWD'),('Canadá','Tajon Buchanan','FWD'),('Canadá','Ali Ahmed','FWD'),
('Canadá','Promise David','FWD');

-- Qatar
INSERT INTO public.players (team, name, position) VALUES
('Qatar','Mahmud Abunada','GK'),('Qatar','Salah Zakaria','GK'),('Qatar','Meshaal Barsham','GK'),
('Qatar','Pedro Miguel','DEF'),('Qatar','Lucas Mendes','DEF'),('Qatar','Issa Laye','DEF'),
('Qatar','Jassem Gaber','DEF'),('Qatar','Ayoub Al-Oui','DEF'),('Qatar','Homam Ahmed','DEF'),
('Qatar','Boualem Khoukhi','DEF'),('Qatar','Sultan Al-Brake','DEF'),('Qatar','Al-Hashmi Al-Hussain','DEF'),
('Qatar','Abdulaziz Hatem','MID'),('Qatar','Karim Boudiaf','MID'),('Qatar','Ahmed Al-Ganehi','MID'),
('Qatar','Ahmed Fathy','MID'),('Qatar','Assim Madibo','MID'),('Qatar','Ahmed Alaaeldin','FWD'),
('Qatar','Edmilson Junior','FWD'),('Qatar','Mohammed Muntari','FWD'),('Qatar','Hassan Al-Haydos','FWD'),
('Qatar','Akram Afif','FWD'),('Qatar','Yusuf Abdurisag','FWD'),('Qatar','Almoez Ali','FWD'),
('Qatar','Tahsin Jamshid','FWD'),('Qatar','Mohamed Manai','FWD');

-- Bosnia y Herzegovina
INSERT INTO public.players (team, name, position) VALUES
('Bosnia y Herzegovina','Nikola Vasilj','GK'),('Bosnia y Herzegovina','Mladen Jurkas','GK'),('Bosnia y Herzegovina','Martin Zlomislić','GK'),
('Bosnia y Herzegovina','Nihad Mujakić','DEF'),('Bosnia y Herzegovina','Dennis Hadžikadunić','DEF'),('Bosnia y Herzegovina','Tarik Muharemović','DEF'),
('Bosnia y Herzegovina','Sead Kolašinac','DEF'),('Bosnia y Herzegovina','Amar Dedić','DEF'),('Bosnia y Herzegovina','Nikola Katić','DEF'),
('Bosnia y Herzegovina','Stjepan Radeljić','DEF'),('Bosnia y Herzegovina','Nidal Čelik','DEF'),('Bosnia y Herzegovina','Benjamin Tahirović','MID'),
('Bosnia y Herzegovina','Armin Gigović','MID'),('Bosnia y Herzegovina','Ivan Bašić','MID'),('Bosnia y Herzegovina','Ivan Šunjić','MID'),
('Bosnia y Herzegovina','Amar Memić','MID'),('Bosnia y Herzegovina','Amir Hadžiahmetović','MID'),('Bosnia y Herzegovina','Dženis Burnić','MID'),
('Bosnia y Herzegovina','Ermin Mahmić','MID'),('Bosnia y Herzegovina','Samed Baždar','FWD'),('Bosnia y Herzegovina','Ermedin Demirović','FWD'),
('Bosnia y Herzegovina','Edin Džeko','FWD'),('Bosnia y Herzegovina','Kerim Alajbegović','FWD'),('Bosnia y Herzegovina','Esmir Bajraktarević','FWD'),
('Bosnia y Herzegovina','Haris Tabaković','FWD'),('Bosnia y Herzegovina','Jovo Lukić','FWD');

-- ===================== GRUPO C =====================
-- Brasil
INSERT INTO public.players (team, name, position) VALUES
('Brasil','Alisson','GK'),('Brasil','Weverton','GK'),('Brasil','Ederson','GK'),
('Brasil','Wesley','DEF'),('Brasil','Gabriel Magalhães','DEF'),('Brasil','Marquinhos','DEF'),
('Brasil','Alex Sandro','DEF'),('Brasil','Danilo','DEF'),('Brasil','Gleison Bremer','DEF'),
('Brasil','Léo Pereira','DEF'),('Brasil','Douglas Santos','DEF'),('Brasil','Roger Ibáñez','DEF'),
('Brasil','Casemiro','MID'),('Brasil','Bruno Guimarães','MID'),('Brasil','Fabinho','MID'),
('Brasil','Danilo Santos','MID'),('Brasil','Lucas Paquetá','MID'),('Brasil','Vinícius Júnior','FWD'),
('Brasil','Matheus Cunha','FWD'),('Brasil','Neymar','FWD'),('Brasil','Raphinha','FWD'),
('Brasil','Endrick','FWD'),('Brasil','Luiz Henrique','FWD'),('Brasil','Gabriel Martinelli','FWD'),
('Brasil','Igor Thiago','FWD'),('Brasil','Rayan','FWD');

-- Marruecos
INSERT INTO public.players (team, name, position) VALUES
('Marruecos','Yassine Bounou','GK'),('Marruecos','Munir Mohamedi','GK'),('Marruecos','Ahmed Reda Tagnaouti','GK'),
('Marruecos','Achraf Hakimi','DEF'),('Marruecos','Noussair Mazraoui','DEF'),('Marruecos','Nayef Aguerd','DEF'),
('Marruecos','Zakaria El Ouahdi','DEF'),('Marruecos','Issa Diop','DEF'),('Marruecos','Chadi Riad','DEF'),
('Marruecos','Youssef Belammari','DEF'),('Marruecos','Redouane Halhal','DEF'),('Marruecos','Anass Salah-Eddine','DEF'),
('Marruecos','Sofyan Amrabat','MID'),('Marruecos','Ayyoub Bouaddi','MID'),('Marruecos','Chemsdine Talbi','MID'),
('Marruecos','Azzedine Ounahi','MID'),('Marruecos','Ismael Saibari','MID'),('Marruecos','Samir El Mourabet','MID'),
('Marruecos','Gessime Yassine','MID'),('Marruecos','Bilal El Khannouss','MID'),('Marruecos','Neil El Aynaoui','MID'),
('Marruecos','Soufiane Rahimi','FWD'),('Marruecos','Brahim Díaz','FWD'),('Marruecos','Abde Ezzalzouli','FWD'),
('Marruecos','Ayoub El Kaabi','FWD'),('Marruecos','Ayoube Amaimouni','FWD');

-- Haití
INSERT INTO public.players (team, name, position) VALUES
('Haití','Johny Placide','GK'),('Haití','Alexandre Pierre','GK'),('Haití','Josuée Duverger','GK'),
('Haití','Carlens Arcus','DEF'),('Haití','Keeto Thermoncy','DEF'),('Haití','Ricardo Adé','DEF'),
('Haití','Hannes Delcroix','DEF'),('Haití','Martin Expérience','DEF'),('Haití','Duke Lacroix','DEF'),
('Haití','Jean-Kévin Duverne','DEF'),('Haití','Wilguens Paugain','DEF'),('Haití','Carl Sainté','MID'),
('Haití','Jean-Ricner Bellegarde','MID'),('Haití','Leverton Pierre','MID'),('Haití','Danley Jean Jacques','MID'),
('Haití','Dominique Simon','MID'),('Haití','Woodensky Pierre','MID'),('Haití','Derrick Etienne Jr.','FWD'),
('Haití','Duckens Nazon','FWD'),('Haití','Louicius Deedson','FWD'),('Haití','Ruben Providence','FWD'),
('Haití','Lenny Joseph','FWD'),('Haití','Wilson Isidor','FWD'),('Haití','Yassin Fortuné','FWD'),
('Haití','Frantzdy Pierrot','FWD'),('Haití','Josuée Casimir','FWD');

-- Escocia
INSERT INTO public.players (team, name, position) VALUES
('Escocia','Angus Gunn','GK'),('Escocia','Liam Kelly','GK'),('Escocia','Craig Gordon','GK'),
('Escocia','Aaron Hickey','DEF'),('Escocia','Andy Robertson','DEF'),('Escocia','Grant Hanley','DEF'),
('Escocia','Kieran Tierney','DEF'),('Escocia','Jack Hendry','DEF'),('Escocia','John Souttar','DEF'),
('Escocia','Dominic Hyam','DEF'),('Escocia','Nathan Patterson','DEF'),('Escocia','Anthony Ralston','DEF'),
('Escocia','Scott McKenna','DEF'),('Escocia','Scott McTominay','MID'),('Escocia','John McGinn','MID'),
('Escocia','Tyler Fletcher','MID'),('Escocia','Ryan Christie','MID'),('Escocia','Lewis Ferguson','MID'),
('Escocia','Kenny McLean','MID'),('Escocia','Lyndon Dykes','FWD'),('Escocia','Ché Adams','FWD'),
('Escocia','Ross Stewart','FWD'),('Escocia','Ben Gannon-Doak','FWD'),('Escocia','George Hirst','FWD'),
('Escocia','Lawrence Shankland','FWD'),('Escocia','Findlay Curtis','FWD');

-- ===================== GRUPO D =====================
-- USA
INSERT INTO public.players (team, name, position) VALUES
('USA','Matt Turner','GK'),('USA','Matt Freese','GK'),('USA','Chris Brady','GK'),
('USA','Serginho Dest','DEF'),('USA','Chris Richards','DEF'),('USA','Antonee Robinson','DEF'),
('USA','Auston Trusty','DEF'),('USA','Miles Robinson','DEF'),('USA','Tim Ream','DEF'),
('USA','Alex Freeman','DEF'),('USA','Maximilian Arfsten','DEF'),('USA','Mark McKenzie','DEF'),
('USA','Joe Scally','DEF'),('USA','Tyler Adams','MID'),('USA','Giovanni Reyna','MID'),
('USA','Weston McKennie','MID'),('USA','Sebastian Berhalter','MID'),('USA','Cristian Roldan','MID'),
('USA','Malik Tillman','MID'),('USA','Ricardo Pepi','FWD'),('USA','Christian Pulisic','FWD'),
('USA','Brenden Aaronson','FWD'),('USA','Haji Wright','FWD'),('USA','Folarin Balogun','FWD'),
('USA','Timothy Weah','FWD'),('USA','Alejandro Zendejas','FWD');

-- Paraguay
INSERT INTO public.players (team, name, position) VALUES
('Paraguay','Gatito Fernández','GK'),('Paraguay','Orlando Gill','GK'),('Paraguay','Gastón Olveira','GK'),
('Paraguay','Gustavo Velázquez','DEF'),('Paraguay','Omar Alderete','DEF'),('Paraguay','Juan José Cáceres','DEF'),
('Paraguay','Fabián Balbuena','DEF'),('Paraguay','Júnior Alonso','DEF'),('Paraguay','José Canale','DEF'),
('Paraguay','Gustavo Gómez','DEF'),('Paraguay','Alexandro Maidana','DEF'),('Paraguay','Ramón Sosa','MID'),
('Paraguay','Diego Gómez','MID'),('Paraguay','Miguel Almirón','MID'),('Paraguay','Maurício','MID'),
('Paraguay','Andrés Cubas','MID'),('Paraguay','Damián Bobadilla','MID'),('Paraguay','Braian Ojeda','MID'),
('Paraguay','Matías Galarza','MID'),('Paraguay','Gustavo Caballero','MID'),('Paraguay','Antonio Sanabria','FWD'),
('Paraguay','Kaku','FWD'),('Paraguay','Álex Arce','FWD'),('Paraguay','Julio Enciso','FWD'),
('Paraguay','Gabriel Ávalos','FWD'),('Paraguay','Isidro Pitta','FWD');

-- Australia
INSERT INTO public.players (team, name, position) VALUES
('Australia','Mathew Ryan','GK'),('Australia','Paul Izzo','GK'),('Australia','Patrick Beach','GK'),
('Australia','Miloš Degenek','DEF'),('Australia','Alessandro Circati','DEF'),('Australia','Jacob Italiano','DEF'),
('Australia','Jordan Bos','DEF'),('Australia','Jason Geria','DEF'),('Australia','Kai Trewin','DEF'),
('Australia','Aziz Behich','DEF'),('Australia','Harry Souttar','DEF'),('Australia','Cameron Burgess','DEF'),
('Australia','Lucas Herrington','DEF'),('Australia','Connor Metcalfe','MID'),('Australia','Ajdin Hrustic','MID'),
('Australia','Aiden O''Neill','MID'),('Australia','Cammy Devlin','MID'),('Australia','Jackson Irvine','MID'),
('Australia','Paul Okon-Engstler','MID'),('Australia','Mathew Leckie','FWD'),('Australia','Mohamed Touré','FWD'),
('Australia','Awer Mabil','FWD'),('Australia','Nestory Irankunda','FWD'),('Australia','Cristian Volpato','FWD'),
('Australia','Nishan Velupillay','FWD'),('Australia','Tete Yengi','FWD');

-- Turquía
INSERT INTO public.players (team, name, position) VALUES
('Turquía','Mert Günok','GK'),('Turquía','Altay Bayındır','GK'),('Turquía','Uğurcan Çakır','GK'),
('Turquía','Zeki Çelik','DEF'),('Turquía','Merih Demiral','DEF'),('Turquía','Çağlar Söyüncü','DEF'),
('Turquía','Eren Elmalı','DEF'),('Turquía','Abdülkerim Bardakçı','DEF'),('Turquía','Ozan Kabak','DEF'),
('Turquía','Mert Müldür','DEF'),('Turquía','Ferdi Kadıoğlu','DEF'),('Turquía','Kaan Ayhan','DEF'),
('Turquía','Samet Akaydin','DEF'),('Turquía','Salih Özcan','MID'),('Turquía','Orkun Kökçü','MID'),
('Turquía','Hakan Çalhanoglu','MID'),('Turquía','İsmail Yüksek','MID'),('Turquía','İrfan Can Kahveci','MID'),
('Turquía','Kerem Aktürkoglu','FWD'),('Turquía','Arda Güler','FWD'),('Turquía','Deniz Gül','FWD'),
('Turquía','Kenan Yıldız','FWD'),('Turquía','Yunus Akgün','FWD'),('Turquía','Barış Alper Yılmaz','FWD'),
('Turquía','Oğuz Aydın','FWD'),('Turquía','Can Uzun','FWD');

-- ===================== GRUPO E =====================
-- Alemania
INSERT INTO public.players (team, name, position) VALUES
('Alemania','Manuel Neuer','GK'),('Alemania','Oliver Baumann','GK'),('Alemania','Alexander Nübel','GK'),
('Alemania','Antonio Rüdiger','DEF'),('Alemania','Waldemar Anton','DEF'),('Alemania','Jonathan Tah','DEF'),
('Alemania','Joshua Kimmich','DEF'),('Alemania','Nico Schlotterbeck','DEF'),('Alemania','Nathaniel Brown','DEF'),
('Alemania','David Raum','DEF'),('Alemania','Malick Thiaw','DEF'),('Alemania','Aleksandar Pavlović','MID'),
('Alemania','Leon Goretzka','MID'),('Alemania','Jamie Leweling','MID'),('Alemania','Jamal Musiala','MID'),
('Alemania','Pascal Groß','MID'),('Alemania','Angelo Stiller','MID'),('Alemania','Florian Wirtz','MID'),
('Alemania','Leroy Sané','MID'),('Alemania','Nadiem Amiri','MID'),('Alemania','Felix Nmecha','MID'),
('Alemania','Kai Havertz','FWD'),('Alemania','Nick Woltemade','FWD'),('Alemania','Maximilian Beier','FWD'),
('Alemania','Deniz Undav','FWD');

-- Curazao
INSERT INTO public.players (team, name, position) VALUES
('Curazao','Eloy Room','GK'),('Curazao','Tyrick Bodak','GK'),('Curazao','Trevor Doornbusch','GK'),
('Curazao','Shurandy Sambo','DEF'),('Curazao','Jurién Gaari','DEF'),('Curazao','Roshon van Eijma','DEF'),
('Curazao','Sherel Floranus','DEF'),('Curazao','Armando Obispo','DEF'),('Curazao','Joshua Brenet','DEF'),
('Curazao','Riechedly Bazoer','DEF'),('Curazao','Deveron Fonville','DEF'),('Curazao','Godfried Roemeratoe','MID'),
('Curazao','Juninho Bacuna','MID'),('Curazao','Livano Comenencia','MID'),('Curazao','Leandro Bacuna','MID'),
('Curazao','Ar''jany Martha','MID'),('Curazao','Tahith Chong','MID'),('Curazao','Kevin Felida','MID'),
('Curazao','Jürgen Locadia','FWD'),('Curazao','Jeremy Antonisse','FWD'),('Curazao','Sontje Hansen','FWD'),
('Curazao','Tyrese Noslin','FWD'),('Curazao','Kenji Gorré','FWD'),('Curazao','Jearl Margaritha','FWD'),
('Curazao','Brandley Kuwas','FWD'),('Curazao','Gervane Kastaneer','FWD');

-- Costa de Marfil
INSERT INTO public.players (team, name, position) VALUES
('Costa de Marfil','Yahia Fofana','GK'),('Costa de Marfil','Mohamed Koné','GK'),('Costa de Marfil','Alban Lafont','GK'),
('Costa de Marfil','Ousmane Diomande','DEF'),('Costa de Marfil','Ghislain Konan','DEF'),('Costa de Marfil','Wilfried Singo','DEF'),
('Costa de Marfil','Odilon Kossounou','DEF'),('Costa de Marfil','Christopher Operi','DEF'),('Costa de Marfil','Guéla Doué','DEF'),
('Costa de Marfil','Emmanuel Agbadou','DEF'),('Costa de Marfil','Evan Ndicka','DEF'),('Costa de Marfil','Jean Michaël Seri','MID'),
('Costa de Marfil','Seko Fofana','MID'),('Costa de Marfil','Franck Kessié','MID'),('Costa de Marfil','Ibrahim Sangare','MID'),
('Costa de Marfil','Parfait Guiagon','MID'),('Costa de Marfil','Christ Inao Oulai','MID'),('Costa de Marfil','Ange-Yoan Bonny','FWD'),
('Costa de Marfil','Simon Adingra','FWD'),('Costa de Marfil','Yan Diomande','FWD'),('Costa de Marfil','Elye Wahi','FWD'),
('Costa de Marfil','Oumar Diakité','FWD'),('Costa de Marfil','Amad Diallo','FWD'),('Costa de Marfil','Nicolas Pépé','FWD'),
('Costa de Marfil','Evann Guessand','FWD'),('Costa de Marfil','Bazoumana Touré','FWD');

-- Ecuador
INSERT INTO public.players (team, name, position) VALUES
('Ecuador','Hernán Galíndez','GK'),('Ecuador','Moisés Ramírez','GK'),('Ecuador','Gonzalo Valle','GK'),
('Ecuador','Félix Torres','DEF'),('Ecuador','Piero Hincapié','DEF'),('Ecuador','Joel Ordóñez','DEF'),
('Ecuador','Willian Pacho','DEF'),('Ecuador','Pervis Estupiñán','DEF'),('Ecuador','Ángelo Preciado','DEF'),
('Ecuador','Jackson Porozo','DEF'),('Ecuador','Yaimar Medina','DEF'),('Ecuador','Jordy Alcívar','MID'),
('Ecuador','Anthony Valencia','MID'),('Ecuador','Kendry Páez','MID'),('Ecuador','Alan Minda','MID'),
('Ecuador','Pedro Vite','MID'),('Ecuador','Denil Castillo','MID'),('Ecuador','Alan Franco','MID'),
('Ecuador','Moisés Caicedo','MID'),('Ecuador','John Yeboah','FWD'),('Ecuador','Kevin Rodríguez','FWD'),
('Ecuador','Enner Valencia','FWD'),('Ecuador','Jordy Caicedo','FWD'),('Ecuador','Gonzalo Plata','FWD'),
('Ecuador','Nilson Angulo','FWD'),('Ecuador','Jeremy Arévalo','FWD');

-- ===================== GRUPO F =====================
-- Países Bajos
INSERT INTO public.players (team, name, position) VALUES
('Países Bajos','Bart Verbruggen','GK'),('Países Bajos','Robin Roefs','GK'),('Países Bajos','Mark Flekken','GK'),
('Países Bajos','Jurrién Timber','DEF'),('Países Bajos','Virgil van Dijk','DEF'),('Países Bajos','Nathan Aké','DEF'),
('Países Bajos','Jan Paul van Hecke','DEF'),('Países Bajos','Mats Wieffer','DEF'),('Países Bajos','Micky van de Ven','DEF'),
('Países Bajos','Denzel Dumfries','DEF'),('Países Bajos','Jorrel Hato','DEF'),('Países Bajos','Marten de Roon','MID'),
('Países Bajos','Justin Kluivert','MID'),('Países Bajos','Ryan Gravenberch','MID'),('Países Bajos','Tijjani Reijnders','MID'),
('Países Bajos','Guus Til','MID'),('Países Bajos','Teun Koopmeiners','MID'),('Países Bajos','Frenkie de Jong','MID'),
('Países Bajos','Quinten Timber','MID'),('Países Bajos','Wout Weghorst','FWD'),('Países Bajos','Memphis Depay','FWD'),
('Países Bajos','Cody Gakpo','FWD'),('Países Bajos','Noa Lang','FWD'),('Países Bajos','Donyell Malen','FWD'),
('Países Bajos','Brian Brobbey','FWD'),('Países Bajos','Crysencio Summerville','FWD');

-- Japón
INSERT INTO public.players (team, name, position) VALUES
('Japón','Zion Suzuki','GK'),('Japón','Keisuke Ōsako','GK'),('Japón','Tomoki Hayakawa','GK'),
('Japón','Yukinari Sugawara','DEF'),('Japón','Shōgo Taniguchi','DEF'),('Japón','Kō Itakura','DEF'),
('Japón','Yūto Nagatomo','DEF'),('Japón','Tsuyoshi Watanabe','DEF'),('Japón','Ayumu Seko','DEF'),
('Japón','Hiroki Itō','DEF'),('Japón','Takehiro Tomiyasu','DEF'),('Japón','Junnosuke Suzuki','DEF'),
('Japón','Wataru Endo','MID'),('Japón','Ao Tanaka','MID'),('Japón','Takefusa Kubo','MID'),
('Japón','Ritsu Dōan','MID'),('Japón','Daizen Maeda','MID'),('Japón','Keito Nakamura','MID'),
('Japón','Junya Itō','MID'),('Japón','Daichi Kamada','MID'),('Japón','Yuito Suzuki','MID'),
('Japón','Kaishū Sano','MID'),('Japón','Keisuke Gotō','FWD'),('Japón','Ayase Ueda','FWD'),
('Japón','Kōki Ogawa','FWD'),('Japón','Kento Shiogai','FWD');

-- Suecia
INSERT INTO public.players (team, name, position) VALUES
('Suecia','Jacob Widell Zetterström','GK'),('Suecia','Viktor Johansson','GK'),('Suecia','Kristoffer Nordfeldt','GK'),
('Suecia','Gustaf Lagerbielke','DEF'),('Suecia','Victor Lindelöf','DEF'),('Suecia','Isak Hien','DEF'),
('Suecia','Gabriel Gudmundsson','DEF'),('Suecia','Herman Johansson','DEF'),('Suecia','Daniel Svensson','DEF'),
('Suecia','Hjalmar Ekdal','DEF'),('Suecia','Carl Starfelt','DEF'),('Suecia','Eric Smith','DEF'),
('Suecia','Alexander Bernhardsson','DEF'),('Suecia','Elliot Stroud','DEF'),('Suecia','Lucas Bergvall','MID'),
('Suecia','Benjamin Nygren','MID'),('Suecia','Ken Sema','MID'),('Suecia','Jesper Karlström','MID'),
('Suecia','Yasin Ayari','MID'),('Suecia','Mattias Svanberg','MID'),('Suecia','Besfort Zeneli','MID'),
('Suecia','Alexander Isak','FWD'),('Suecia','Anthony Elanga','FWD'),('Suecia','Viktor Gyökeres','FWD'),
('Suecia','Gustaf Nilsson','FWD'),('Suecia','Taha Ali','FWD');

-- Túnez
INSERT INTO public.players (team, name, position) VALUES
('Túnez','Mouhib Chamakh','GK'),('Túnez','Aymen Dahmen','GK'),('Túnez','Sabri Ben Hessen','GK'),
('Túnez','Ali Abdi','DEF'),('Túnez','Montassar Talbi','DEF'),('Túnez','Omar Rekik','DEF'),
('Túnez','Adem Arous','DEF'),('Túnez','Dylan Bronn','DEF'),('Túnez','Mortadha Ben Ouanes','DEF'),
('Túnez','Yan Valery','DEF'),('Túnez','Mohamed Amine Ben Hamida','DEF'),('Túnez','Moutaz Neffati','DEF'),
('Túnez','Raed Chikhaoui','DEF'),('Túnez','Hannibal Mejbri','MID'),('Túnez','Ismaël Gharbi','MID'),
('Túnez','Rani Khedira','MID'),('Túnez','Khalil Ayari','MID'),('Túnez','Hadj Mahmoud','MID'),
('Túnez','Ellyes Skhiri','MID'),('Túnez','Anis Ben Slimane','MID'),('Túnez','Sebastian Tounekti','MID'),
('Túnez','Elias Achouri','FWD'),('Túnez','Elias Saad','FWD'),('Túnez','Hazem Mastouri','FWD'),
('Túnez','Rayan Elloumi','FWD'),('Túnez','Firas Chaouat','FWD');

-- ===================== GRUPO G =====================
-- Bélgica
INSERT INTO public.players (team, name, position) VALUES
('Bélgica','Thibaut Courtois','GK'),('Bélgica','Senne Lammens','GK'),('Bélgica','Mike Penders','GK'),
('Bélgica','Zeno Debast','DEF'),('Bélgica','Arthur Theate','DEF'),('Bélgica','Brandon Mechele','DEF'),
('Bélgica','Maxim De Cuyper','DEF'),('Bélgica','Thomas Meunier','DEF'),('Bélgica','Koni De Winter','DEF'),
('Bélgica','Joaquin Seys','DEF'),('Bélgica','Timothy Castagne','DEF'),('Bélgica','Nathan Ngoy','DEF'),
('Bélgica','Axel Witsel','MID'),('Bélgica','Kevin De Bruyne','MID'),('Bélgica','Youri Tielemans','MID'),
('Bélgica','Diego Moreira','MID'),('Bélgica','Hans Vanaken','MID'),('Bélgica','Alexis Saelemaekers','MID'),
('Bélgica','Nicolas Raskin','MID'),('Bélgica','Amadou Onana','MID'),('Bélgica','Romelu Lukaku','FWD'),
('Bélgica','Leandro Trossard','FWD'),('Bélgica','Jérémey Doku','FWD'),('Bélgica','Dodi Lukébakio','FWD'),
('Bélgica','Charles De Ketelaere','FWD'),('Bélgica','Matias Fernandez-Pardo','FWD');

-- Egipto
INSERT INTO public.players (team, name, position) VALUES
('Egipto','Mohamed El Shenawy','GK'),('Egipto','El Mahdy Soliman','GK'),('Egipto','Mostafa Shobeir','GK'),
('Egipto','Mohamed Alaa','GK'),('Egipto','Yasser Ibrahim','DEF'),('Egipto','Mohamed Hany','DEF'),
('Egipto','Hossam Abdelmaguid','DEF'),('Egipto','Ramy Rabia','DEF'),('Egipto','Mohamed Abdelmonem','DEF'),
('Egipto','Ahmed Fatouh','DEF'),('Egipto','Karim Hafez','DEF'),('Egipto','Tarek Alaa','DEF'),
('Egipto','Emam Ashour','MID'),('Egipto','Mostafa Ziko','MID'),('Egipto','Hamdy Fathy','MID'),
('Egipto','Mohanad Lasheen','MID'),('Egipto','Nabil Emad','MID'),('Egipto','Marwan Attia','MID'),
('Egipto','Mahmoud Saber','MID'),('Egipto','Trézéguet','FWD'),('Egipto','Hamza Abdelkarim','FWD'),
('Egipto','Mohamed Salah','FWD'),('Egipto','Haissem Hassan','FWD'),('Egipto','Ibrahim Adel','FWD'),
('Egipto','Omar Marmoush','FWD'),('Egipto','Zizo','FWD');

-- Irán
INSERT INTO public.players (team, name, position) VALUES
('Irán','Alireza Beiranvand','GK'),('Irán','Payam Niazmand','GK'),('Irán','Hossein Hosseini','GK'),
('Irán','Saleh Hardani','DEF'),('Irán','Ehsan Hajsafi','DEF'),('Irán','Shojae Khalilzadeh','DEF'),
('Irán','Milad Mohammadi','DEF'),('Irán','Hossein Kanaanizadegan','DEF'),('Irán','Aria Yousefi','DEF'),
('Irán','Ali Nemati','DEF'),('Irán','Ramin Rezaeian','DEF'),('Irán','Danial Eiri','DEF'),
('Irán','Saeid Ezatolahi','MID'),('Irán','Alireza Jahanbakhsh','MID'),('Irán','Mohammad Mohebi','MID'),
('Irán','Saman Ghoddos','MID'),('Irán','Rouzbeh Cheshmi','MID'),('Irán','Mehdi Torabi','MID'),
('Irán','Mohammad Ghorbani','MID'),('Irán','Amirmohammad Razzaghinia','MID'),('Irán','Mehdi Taremi','FWD'),
('Irán','Mehdi Ghayedi','FWD'),('Irán','Ali Alipour','FWD'),('Irán','Amirhossein Hosseinzadeh','FWD'),
('Irán','Shahriyar Moghanlou','FWD'),('Irán','Dennis Eckert','FWD');

-- Nueva Zelanda
INSERT INTO public.players (team, name, position) VALUES
('Nueva Zelanda','Max Crocombe','GK'),('Nueva Zelanda','Alex Paulsen','GK'),('Nueva Zelanda','Michael Woud','GK'),
('Nueva Zelanda','Tim Payne','DEF'),('Nueva Zelanda','Francis de Vries','DEF'),('Nueva Zelanda','Tyler Bindon','DEF'),
('Nueva Zelanda','Michael Boxall','DEF'),('Nueva Zelanda','Liberato Cacace','DEF'),('Nueva Zelanda','Nando Pijnaker','DEF'),
('Nueva Zelanda','Finn Surman','DEF'),('Nueva Zelanda','Callan Elliot','DEF'),('Nueva Zelanda','Tommy Smith','DEF'),
('Nueva Zelanda','Joe Bell','MID'),('Nueva Zelanda','Matthew Garbett','MID'),('Nueva Zelanda','Marko Stamenić','MID'),
('Nueva Zelanda','Sarpreet Singh','MID'),('Nueva Zelanda','Elijah Just','MID'),('Nueva Zelanda','Alex Rufer','MID'),
('Nueva Zelanda','Ben Old','MID'),('Nueva Zelanda','Callum McCowatt','MID'),('Nueva Zelanda','Ryan Thomas','MID'),
('Nueva Zelanda','Lachlan Bayliss','MID'),('Nueva Zelanda','Chris Wood','FWD'),('Nueva Zelanda','Kosta Barbarouses','FWD'),
('Nueva Zelanda','Ben Waine','FWD'),('Nueva Zelanda','Jesse Randall','FWD');

-- ===================== GRUPO H =====================
-- España
INSERT INTO public.players (team, name, position) VALUES
('España','David Raya','GK'),('España','Joan Garcia','GK'),('España','Unai Simón','GK'),
('España','Marc Pubill','DEF'),('España','Álex Grimaldo','DEF'),('España','Eric García','DEF'),
('España','Marcos Llorente','DEF'),('España','Pedro Porro','DEF'),('España','Aymeric Laporte','DEF'),
('España','Nico Williams','DEF'),('España','Pau Cubarsí','DEF'),('España','Marc Cucurella','DEF'),
('España','Mikel Merino','MID'),('España','Fabián Ruiz','MID'),('España','Gavi','MID'),
('España','Álex Baena','MID'),('España','Rodri','MID'),('España','Martín Zubimendi','MID'),
('España','Pedri','MID'),('España','Ferran Torres','FWD'),('España','Dani Olmo','FWD'),
('España','Yéremy Pino','FWD'),('España','Lamine Yamal','FWD'),('España','Mikel Oyarzabal','FWD'),
('España','Víctor Muñoz','FWD'),('España','Borja Iglesias','FWD');

-- Cabo Verde
INSERT INTO public.players (team, name, position) VALUES
('Cabo Verde','Vozinha','GK'),('Cabo Verde','Mário Rosa','GK'),('Cabo Verde','CJ dos Santos','GK'),
('Cabo Verde','Stopira','DEF'),('Cabo Verde','Diney','DEF'),('Cabo Verde','Roberto Lopes','DEF'),
('Cabo Verde','Logan Costa','DEF'),('Cabo Verde','Sidny Lopes Cabral','DEF'),('Cabo Verde','Steven Moreira','DEF'),
('Cabo Verde','Wagner Pina','DEF'),('Cabo Verde','Kelvin Pires','DEF'),('Cabo Verde','Kevin Pina','MID'),
('Cabo Verde','Jovane Cabral','MID'),('Cabo Verde','João Paulo Fernandes','MID'),('Cabo Verde','Jamiro Monteiro','MID'),
('Cabo Verde','Garry Rodrigues','MID'),('Cabo Verde','Deroy Duarte','MID'),('Cabo Verde','Laros Duarte','MID'),
('Cabo Verde','Yannick Semedo','MID'),('Cabo Verde','Willy Semedo','MID'),('Cabo Verde','Telmo Arcanjo','MID'),
('Cabo Verde','Nuno da Costa','MID'),('Cabo Verde','Hélio Varela','MID'),('Cabo Verde','Gilson Benchimol','FWD'),
('Cabo Verde','Dailon Livramento','FWD'),('Cabo Verde','Ryan Mendes','FWD');

-- Arabia Saudita
INSERT INTO public.players (team, name, position) VALUES
('Arabia Saudita','Nawaf Al-Aqidi','GK'),('Arabia Saudita','Mohammed Al-Owais','GK'),('Arabia Saudita','Ahmed Al-Kassar','GK'),
('Arabia Saudita','Ali Majrashi','DEF'),('Arabia Saudita','Ali Lajami','DEF'),('Arabia Saudita','Abdulelah Al-Amri','DEF'),
('Arabia Saudita','Hassan Al-Tambakti','DEF'),('Arabia Saudita','Saud Abdulhamid','DEF'),('Arabia Saudita','Nawaf Boushal','DEF'),
('Arabia Saudita','Hassan Kadesh','DEF'),('Arabia Saudita','Moteb Al-Harbi','DEF'),('Arabia Saudita','Jehad Thakri','DEF'),
('Arabia Saudita','Mohammed Abu Al-Shamat','DEF'),('Arabia Saudita','Nasser Al-Dawsari','MID'),('Arabia Saudita','Musab Al-Juwayr','MID'),
('Arabia Saudita','Abdullah Al-Khaibari','MID'),('Arabia Saudita','Ziyad Al-Johani','MID'),('Arabia Saudita','Alaa Al-Hejji','MID'),
('Arabia Saudita','Mohamed Kanno','MID'),('Arabia Saudita','Ayman Yahya','FWD'),('Arabia Saudita','Firas Al-Buraikan','FWD'),
('Arabia Saudita','Salem Al-Dawsari','FWD'),('Arabia Saudita','Saleh Al-Shehri','FWD'),('Arabia Saudita','Khalid Al-Ghannam','FWD'),
('Arabia Saudita','Abdullah Al-Hamdan','FWD'),('Arabia Saudita','Sultan Mandash','FWD');

-- Uruguay
INSERT INTO public.players (team, name, position) VALUES
('Uruguay','Sergio Rochet','GK'),('Uruguay','Santiago Mele','GK'),('Uruguay','Fernando Muslera','GK'),
('Uruguay','José Giménez','DEF'),('Uruguay','Sebastián Cáceres','DEF'),('Uruguay','Ronald Araújo','DEF'),
('Uruguay','Guillermo Varela','DEF'),('Uruguay','Mathías Olivera','DEF'),('Uruguay','Matías Viña','DEF'),
('Uruguay','Santiago Bueno','DEF'),('Uruguay','Manuel Ugarte','MID'),('Uruguay','Rodrigo Bentancur','MID'),
('Uruguay','Nicolás de la Cruz','MID'),('Uruguay','Federico Valverde','MID'),('Uruguay','Giorgian de Arrascaeta','MID'),
('Uruguay','Agustín Canobbio','MID'),('Uruguay','Emiliano Martínez','MID'),('Uruguay','Maximiliano Araújo','MID'),
('Uruguay','Joaquín Piquerez','MID'),('Uruguay','Juan Manuel Sanabria','MID'),('Uruguay','Rodrigo Zalazar','MID'),
('Uruguay','Darwin Núñez','FWD'),('Uruguay','Facundo Pellistri','FWD'),('Uruguay','Brian Rodríguez','FWD'),
('Uruguay','Rodrigo Aguirre','FWD'),('Uruguay','Federico Viñas','FWD');

-- ===================== GRUPO I =====================
-- Francia
INSERT INTO public.players (team, name, position) VALUES
('Francia','Brice Samba','GK'),('Francia','Mike Maignan','GK'),('Francia','Robin Risser','GK'),
('Francia','Malo Gusto','DEF'),('Francia','Lucas Digne','DEF'),('Francia','Dayot Upamecano','DEF'),
('Francia','Jules Koundé','DEF'),('Francia','Ibrahima Konaté','DEF'),('Francia','William Saliba','DEF'),
('Francia','Theo Hernandez','DEF'),('Francia','Lucas Hernandez','DEF'),('Francia','Maxence Lacroix','DEF'),
('Francia','Manu Koné','MID'),('Francia','Aurélien Tchouaméni','MID'),('Francia','N''Golo Kanté','MID'),
('Francia','Adrien Rabiot','MID'),('Francia','Warren Zaïre-Emery','MID'),('Francia','Rayan Cherki','MID'),
('Francia','Maghnes Akliouche','MID'),('Francia','Ousmane Dembélé','FWD'),('Francia','Marcus Thuram','FWD'),
('Francia','Kylian Mbappé','FWD'),('Francia','Michael Olise','FWD'),('Francia','Bradley Barcola','FWD'),
('Francia','Désiré Doué','FWD'),('Francia','Jean-Philippe Mateta','FWD');

-- Senegal
INSERT INTO public.players (team, name, position) VALUES
('Senegal','Yehvann Diouf','GK'),('Senegal','Édouard Mendy','GK'),('Senegal','Mory Diaw','GK'),
('Senegal','Mamadou Sarr','DEF'),('Senegal','Kalidou Koulibaly','DEF'),('Senegal','Abdoulaye Seck','DEF'),
('Senegal','Ismail Jakobs','DEF'),('Senegal','Krépin Diatta','DEF'),('Senegal','Moussa Niakhaté','DEF'),
('Senegal','Antoine Mendy','DEF'),('Senegal','El Hadji Malick Diouf','DEF'),('Senegal','Idrissa Gueye','MID'),
('Senegal','Pathé Ciss','MID'),('Senegal','Lamine Camara','MID'),('Senegal','Pape Matar Sarr','MID'),
('Senegal','Habib Diarra','MID'),('Senegal','Bara Sapoko Ndiaye','MID'),('Senegal','Pape Gueye','MID'),
('Senegal','Assane Diao','FWD'),('Senegal','Bamba Dieng','FWD'),('Senegal','Sadio Mané','FWD'),
('Senegal','Nicolas Jackson','FWD'),('Senegal','Cherif Ndiaye','FWD'),('Senegal','Iliman Ndiaye','FWD'),
('Senegal','Ismaïla Sarr','FWD'),('Senegal','Ibrahim Mbaye','FWD');

-- Iraq
INSERT INTO public.players (team, name, position) VALUES
('Iraq','Fahad Talib','GK'),('Iraq','Jalal Hassan','GK'),('Iraq','Ahmed Basil','GK'),
('Iraq','Rebin Sulaka','DEF'),('Iraq','Hussein Ali','DEF'),('Iraq','Zaid Tahseen','DEF'),
('Iraq','Akam Hashim','DEF'),('Iraq','Manaf Younis','DEF'),('Iraq','Ahmed Yahya','DEF'),
('Iraq','Merchas Doski','DEF'),('Iraq','Mustafa Saadoon','DEF'),('Iraq','Frans Putros','DEF'),
('Iraq','Youssef Amyn','MID'),('Iraq','Ibrahim Bayesh','MID'),('Iraq','Zidane Iqbal','MID'),
('Iraq','Amir Al-Ammari','MID'),('Iraq','Kevin Yakob','MID'),('Iraq','Aimar Sher','MID'),
('Iraq','Zaid Ismail','MID'),('Iraq','Ali Al-Hamadi','FWD'),('Iraq','Mohanad Ali','FWD'),
('Iraq','Ahmed Qasem','FWD'),('Iraq','Ali Yousif','FWD'),('Iraq','Ali Jasim','FWD'),
('Iraq','Aymen Hussein','FWD'),('Iraq','Marko Farji','FWD');

-- Noruega
INSERT INTO public.players (team, name, position) VALUES
('Noruega','Ørjan Nyland','GK'),('Noruega','Sander Tangvik','GK'),('Noruega','Egil Selvik','GK'),
('Noruega','Kristoffer Ajer','DEF'),('Noruega','Leo Østigård','DEF'),('Noruega','David Möller Wolfe','DEF'),
('Noruega','Fredrik André Bjørkan','DEF'),('Noruega','Marcus Holmgren Pedersen','DEF'),('Noruega','Torbjørn Heggem','DEF'),
('Noruega','Sondre Langås','DEF'),('Noruega','Henrik Falchener','DEF'),('Noruega','Morten Thorsby','MID'),
('Noruega','Patrick Berg','MID'),('Noruega','Sander Berge','MID'),('Noruega','Martin Ødegaard','MID'),
('Noruega','Fredrik Aursnes','MID'),('Noruega','Kristian Thorstvedt','MID'),('Noruega','Thelo Aasgaard','MID'),
('Noruega','Andreas Schjelderup','MID'),('Noruega','Oscar Bobb','MID'),('Noruega','Jens Petter Hauge','MID'),
('Noruega','Alexander Sørloth','FWD'),('Noruega','Erling Haaland','FWD'),('Noruega','Jørgen Strand Larsen','FWD'),
('Noruega','Antonio Nusa','FWD'),('Noruega','Julian Ryerson','FWD');

-- ===================== GRUPO J =====================
-- Argentina
INSERT INTO public.players (team, name, position) VALUES
('Argentina','Juan Musso','GK'),('Argentina','Gerónimo Rulli','GK'),('Argentina','Emiliano Martínez','GK'),
('Argentina','Leonardo Balerdi','DEF'),('Argentina','Nicolás Tagliafico','DEF'),('Argentina','Gonzalo Montiel','DEF'),
('Argentina','Lisandro Martínez','DEF'),('Argentina','Cristian Romero','DEF'),('Argentina','Nicolás Otamendi','DEF'),
('Argentina','Facundo Medina','DEF'),('Argentina','Nahuel Molina','DEF'),('Argentina','Leandro Paredes','MID'),
('Argentina','Rodrigo De Paul','MID'),('Argentina','Valentín Barco','MID'),('Argentina','Giovani Lo Celso','MID'),
('Argentina','Exequiel Palacios','MID'),('Argentina','Nicolás González','MID'),('Argentina','Alexis Mac Allister','MID'),
('Argentina','Enzo Fernández','MID'),('Argentina','Julián Álvarez','FWD'),('Argentina','Lionel Messi','FWD'),
('Argentina','Thiago Almada','FWD'),('Argentina','Giuliano Simeone','FWD'),('Argentina','Nico Paz','FWD'),
('Argentina','Lautaro Martínez','FWD'),('Argentina','José Manuel López','FWD');

-- Argelia
INSERT INTO public.players (team, name, position) VALUES
('Argelia','Melvin Mastil','GK'),('Argelia','Oussama Benbot','GK'),('Argelia','Luca Zidane','GK'),
('Argelia','Aïssa Mandi','DEF'),('Argelia','Achref Abada','DEF'),('Argelia','Mohamed Amine Tougai','DEF'),
('Argelia','Zineddine Belaïd','DEF'),('Argelia','Jaouen Hadjam','DEF'),('Argelia','Rayan Aït-Nouri','DEF'),
('Argelia','Rafik Belghali','DEF'),('Argelia','Ramy Bensebaini','DEF'),('Argelia','Samir Chergui','DEF'),
('Argelia','Ramiz Zerrouki','MID'),('Argelia','Houssem Aouar','MID'),('Argelia','Farès Chaïbi','MID'),
('Argelia','Hicham Boudaoui','MID'),('Argelia','Nabil Bentaleb','MID'),('Argelia','Ibrahim Maza','MID'),
('Argelia','Yacine Titraoui','MID'),('Argelia','Riyad Mahrez','FWD'),('Argelia','Amine Gouiri','FWD'),
('Argelia','Anis Hadj Moussa','FWD'),('Argelia','Nadhir Benbouali','FWD'),('Argelia','Mohamed Amoura','FWD'),
('Argelia','Farès Ghedjemis','FWD');

-- Austria
INSERT INTO public.players (team, name, position) VALUES
('Austria','Alexander Schlager','GK'),('Austria','Florian Wiegele','GK'),('Austria','Patrick Pentz','GK'),
('Austria','David Affengruber','DEF'),('Austria','Kevin Danso','DEF'),('Austria','Stefan Posch','DEF'),
('Austria','David Alaba','DEF'),('Austria','Philipp Lienhart','DEF'),('Austria','Phillipp Mwene','DEF'),
('Austria','Marco Friedl','DEF'),('Austria','Michael Svoboda','DEF'),('Austria','Xaver Schlager','MID'),
('Austria','Nicolas Seiwald','MID'),('Austria','Marcel Sabitzer','MID'),('Austria','Florian Grillitsch','MID'),
('Austria','Carney Chukwuemeka','MID'),('Austria','Romano Schmid','MID'),('Austria','Konrad Laimer','MID'),
('Austria','Alexander Prass','MID'),('Austria','Alessandro Schöpf','MID'),('Austria','Marko Arnautović','FWD'),
('Austria','Michael Gregoritsch','FWD'),('Austria','Saša Kalajdžić','FWD'),('Austria','Patrick Wimmer','FWD');

-- Jordania
INSERT INTO public.players (team, name, position) VALUES
('Jordania','Yazeed Abulaila','GK'),('Jordania','Nour Bani Attiah','GK'),('Jordania','Abdallah Al-Fakhouri','GK'),
('Jordania','Mohammad Abu Hashish','DEF'),('Jordania','Abdallah Nasib','DEF'),('Jordania','Husam Abu Dahab','DEF'),
('Jordania','Yazan Al-Arab','DEF'),('Jordania','Mo Abualnadi','DEF'),('Jordania','Salim Obaid','DEF'),
('Jordania','Saed Al-Rosan','DEF'),('Jordania','Ihsan Haddad','DEF'),('Jordania','Anas Badawi','DEF'),
('Jordania','Amer Jamous','MID'),('Jordania','Noor Al-Rawabdeh','MID'),('Jordania','Rajaei Ayed','MID'),
('Jordania','Ibrahim Sadeh','MID'),('Jordania','Mohannad Abu Taha','MID'),('Jordania','Nizar Al-Rashdan','MID'),
('Jordania','Mohammad Al-Dawoud','MID'),('Jordania','Mohammad Abu Zrayq','FWD'),('Jordania','Ali Olwan','FWD'),
('Jordania','Musa Al-Taamari','FWD'),('Jordania','Odeh Al-Fakhouri','FWD'),('Jordania','Mahmoud Al-Mardi','FWD'),
('Jordania','Ali Azaizeh','FWD');

-- ===================== GRUPO K =====================
-- Portugal
INSERT INTO public.players (team, name, position) VALUES
('Portugal','Diogo Costa','GK'),('Portugal','José Sá','GK'),('Portugal','Rui Silva','GK'),
('Portugal','Nélson Semedo','DEF'),('Portugal','Rúben Dias','DEF'),('Portugal','Tomás Araújo','DEF'),
('Portugal','Diogo Dalot','DEF'),('Portugal','Renato Veiga','DEF'),('Portugal','Gonçalo Inácio','DEF'),
('Portugal','João Cancelo','DEF'),('Portugal','Samú Costa','DEF'),('Portugal','Nuno Mendes','DEF'),
('Portugal','Matheus Nunes','MID'),('Portugal','Bruno Fernandes','MID'),('Portugal','Bernardo Silva','MID'),
('Portugal','João Neves','MID'),('Portugal','Rúben Neves','MID'),('Portugal','Vitinha','MID'),
('Portugal','Cristiano Ronaldo','FWD'),('Portugal','Gonçalo Ramos','FWD'),('Portugal','João Félix','FWD'),
('Portugal','Francisco Trincão','FWD'),('Portugal','Rafael Leão','FWD'),('Portugal','Pedro Neto','FWD'),
('Portugal','Gonçalo Guedes','FWD'),('Portugal','Francisco Conceição','FWD');

-- RD Congo
INSERT INTO public.players (team, name, position) VALUES
('RD Congo','Lionel Mpasi','GK'),('RD Congo','Timothy Fayulu','GK'),('RD Congo','Matthieu Epolo','GK'),
('RD Congo','Aaron Wan-Bissaka','DEF'),('RD Congo','Steve Kapuadi','DEF'),('RD Congo','Axel Tuanzebe','DEF'),
('RD Congo','Dylan Batubinsika','DEF'),('RD Congo','Joris Kayembe','DEF'),('RD Congo','Chancel Mbemba','DEF'),
('RD Congo','Gédéon Kalulu','DEF'),('RD Congo','Arthur Masuaku','DEF'),('RD Congo','Ngal''ayel Mukau','MID'),
('RD Congo','Nathanaël Mbuku','MID'),('RD Congo','Samuel Moutoussamy','MID'),('RD Congo','Théo Bongonda','MID'),
('RD Congo','Noah Sadiki','MID'),('RD Congo','Aaron Tshibola','MID'),('RD Congo','Charles Pickel','MID'),
('RD Congo','Edo Kayembe','MID'),('RD Congo','Brian Cipenga','FWD'),('RD Congo','Gaël Kakuta','FWD'),
('RD Congo','Meschak Elia','FWD'),('RD Congo','Cédric Bakambu','FWD'),('RD Congo','Fiston Mayele','FWD'),
('RD Congo','Yoane Wissa','FWD'),('RD Congo','Simon Banza','FWD');

-- Uzbekistán
INSERT INTO public.players (team, name, position) VALUES
('Uzbekistán','Utkir Yusupov','GK'),('Uzbekistán','Abduvohid Nematov','GK'),('Uzbekistán','Botirali Ergashev','GK'),
('Uzbekistán','Abdukodir Khusanov','DEF'),('Uzbekistán','Khojiakbar Alijonov','DEF'),('Uzbekistán','Farrukh Sayfiev','DEF'),
('Uzbekistán','Rustam Ashurmatov','DEF'),('Uzbekistán','Sherzod Nasrullaev','DEF'),('Uzbekistán','Umar Eshmurodov','DEF'),
('Uzbekistán','Abdulla Abdullaev','DEF'),('Uzbekistán','Bekhruz Karimov','DEF'),('Uzbekistán','Avazbek Ulmasaliev','DEF'),
('Uzbekistán','Jakhongir Urozov','DEF'),('Uzbekistán','Akmal Mozgovoy','MID'),('Uzbekistán','Otabek Shukurov','MID'),
('Uzbekistán','Jamshid Iskanderov','MID'),('Uzbekistán','Odiljon Hamrobekov','MID'),('Uzbekistán','Jaloliddin Masharipov','MID'),
('Uzbekistán','Oston Urunov','MID'),('Uzbekistán','Dostonbek Khamdamov','MID'),('Uzbekistán','Azizjon Ganiev','MID'),
('Uzbekistán','Abbosbek Fayzullaev','MID'),('Uzbekistán','Sherzod Esanov','MID'),('Uzbekistán','Eldor Shomurodov','FWD'),
('Uzbekistán','Azizbek Amonov','FWD'),('Uzbekistán','Igor Sergeev','FWD');

-- Colombia
INSERT INTO public.players (team, name, position) VALUES
('Colombia','David Ospina','GK'),('Colombia','Camilo Vargas','GK'),('Colombia','Álvaro Montero','GK'),
('Colombia','Daniel Muñoz','DEF'),('Colombia','Jhon Lucumí','DEF'),('Colombia','Santiago Arias','DEF'),
('Colombia','Yerry Mina','DEF'),('Colombia','Gustavo Puerta','DEF'),('Colombia','Johan Mojica','DEF'),
('Colombia','Willer Ditta','DEF'),('Colombia','Deiver Machado','DEF'),('Colombia','Davinson Sánchez','DEF'),
('Colombia','Kevin Castaño','MID'),('Colombia','Richard Ríos','MID'),('Colombia','Jorge Carrascal','MID'),
('Colombia','James Rodríguez','MID'),('Colombia','Jhon Arias','MID'),('Colombia','Juan Portilla','MID'),
('Colombia','Jefferson Lerma','MID'),('Colombia','Juan Fernando Quintero','MID'),('Colombia','Luis Díaz','FWD'),
('Colombia','Jhon Córdoba','FWD'),('Colombia','Cucho Hernández','FWD'),('Colombia','Jaminton Campaz','FWD'),
('Colombia','Luis Suárez','FWD'),('Colombia','Andrés Gómez','FWD');

-- ===================== GRUPO L =====================
-- Inglaterra
INSERT INTO public.players (team, name, position) VALUES
('Inglaterra','Jordan Pickford','GK'),('Inglaterra','Dean Henderson','GK'),('Inglaterra','James Trafford','GK'),
('Inglaterra','Ezri Konsa','DEF'),('Inglaterra','Nico O''Reilly','DEF'),('Inglaterra','John Stones','DEF'),
('Inglaterra','Marc Guéhi','DEF'),('Inglaterra','Tino Livramento','DEF'),('Inglaterra','Dan Burn','DEF'),
('Inglaterra','Reece James','DEF'),('Inglaterra','Djed Spence','DEF'),('Inglaterra','Jarell Quansah','DEF'),
('Inglaterra','Declan Rice','MID'),('Inglaterra','Elliot Anderson','MID'),('Inglaterra','Jude Bellingham','MID'),
('Inglaterra','Jordan Henderson','MID'),('Inglaterra','Kobbie Mainoo','MID'),('Inglaterra','Morgan Rogers','MID'),
('Inglaterra','Eberechi Eze','MID'),('Inglaterra','Bukayo Saka','FWD'),('Inglaterra','Harry Kane','FWD'),
('Inglaterra','Marcus Rashford','FWD'),('Inglaterra','Anthony Gordon','FWD'),('Inglaterra','Ollie Watkins','FWD'),
('Inglaterra','Noni Madueke','FWD'),('Inglaterra','Ivan Toney','FWD');

-- Croacia
INSERT INTO public.players (team, name, position) VALUES
('Croacia','Dominik Livaković','GK'),('Croacia','Ivor Pandur','GK'),('Croacia','Dominik Kotarski','GK'),
('Croacia','Josip Stanišić','DEF'),('Croacia','Marin Pongračić','DEF'),('Croacia','Joško Gvardiol','DEF'),
('Croacia','Duje Ćaleta-Car','DEF'),('Croacia','Josip Šutalo','DEF'),('Croacia','Kristijan Jakić','DEF'),
('Croacia','Luka Vušković','DEF'),('Croacia','Martin Erlić','DEF'),('Croacia','Nikola Moro','MID'),
('Croacia','Mateo Kovačić','MID'),('Croacia','Luka Modrić','MID'),('Croacia','Nikola Vlašić','MID'),
('Croacia','Mario Pašalić','MID'),('Croacia','Martin Baturina','MID'),('Croacia','Petar Sučić','MID'),
('Croacia','Toni Fruk','MID'),('Croacia','Luka Sučić','MID'),('Croacia','Andrej Kramarić','FWD'),
('Croacia','Ante Budimir','FWD'),('Croacia','Ivan Perišić','FWD'),('Croacia','Igor Matanović','FWD'),
('Croacia','Marco Pašalić','FWD'),('Croacia','Petar Musa','FWD');

-- Ghana
INSERT INTO public.players (team, name, position) VALUES
('Ghana','Lawrence Ati-Zigi','GK'),('Ghana','Joseph Anang','GK'),('Ghana','Benjamin Asare','GK'),
('Ghana','Alidu Seidu','DEF'),('Ghana','Jonas Adjetey','DEF'),('Ghana','Abdul Mumin','DEF'),
('Ghana','Gideon Mensah','DEF'),('Ghana','Abdul Rahman Baba','DEF'),('Ghana','Jerome Opoku','DEF'),
('Ghana','Kojo Peprah Oppong','DEF'),('Ghana','Derrick Luckassen','DEF'),('Ghana','Marvin Senaya','DEF'),
('Ghana','Caleb Yirenkyi','MID'),('Ghana','Thomas Partey','MID'),('Ghana','Kwasi Sibo','MID'),
('Ghana','Antoine Semenyo','MID'),('Ghana','Elisha Owusu','MID'),('Ghana','Augustine Boakye','MID'),
('Ghana','Abdul Fatawu','FWD'),('Ghana','Jordan Ayew','FWD'),('Ghana','Brandon Thomas-Asante','FWD'),
('Ghana','Christopher Bonsu Baah','FWD'),('Ghana','Iñaki Williams','FWD'),('Ghana','Kamaldeen Sulemana','FWD'),
('Ghana','Ernest Nuamah','FWD'),('Ghana','Prince Kwabena Adu','FWD');

-- Panamá
INSERT INTO public.players (team, name, position) VALUES
('Panamá','Luis Mejía','GK'),('Panamá','César Samudio','GK'),('Panamá','Orlando Mosquera','GK'),
('Panamá','César Blackman','DEF'),('Panamá','José Córdoba','DEF'),('Panamá','Fidel Escobar','DEF'),
('Panamá','Edgardo Fariña','DEF'),('Panamá','Jiovany Ramos','DEF'),('Panamá','Carlos Harvey','DEF'),
('Panamá','Eric Davis','DEF'),('Panamá','Andrés Andrade','DEF'),('Panamá','Michael Amir Murillo','DEF'),
('Panamá','Roderick Miller','DEF'),('Panamá','Jorge Gutiérrez','DEF'),('Panamá','Cristian Martínez','MID'),
('Panamá','José Luis Rodríguez','MID'),('Panamá','Adalberto Carrasquilla','MID'),('Panamá','Ismael Díaz','MID'),
('Panamá','Yoel Bárcenas','MID'),('Panamá','Alberto Quintero','MID'),('Panamá','Aníbal Godoy','MID'),
('Panamá','César Yanis','MID'),('Panamá','Tomás Rodríguez','FWD'),('Panamá','José Fajardo','FWD'),
('Panamá','Cecilio Waterman','FWD'),('Panamá','Azarias Londoño','FWD');
