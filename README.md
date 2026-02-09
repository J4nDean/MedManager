# MedManager

Kompleksowa aplikacja internetowa do zarządzania receptami i dokumentacją medyczną. System umożliwia efektywną komunikację między lekarzami a pacjentami, uprościć proces wystawiania recept oraz śledzenia historii leczenia.

## Opis Funkcjonalności

### Moduł Lekarza
- **Zarządzanie pacjentami** - przeglądanie pełnej listy przypisanych pacjentów
- **Wystawianie recept** - tworzenie, edycja i przeglądanie recept dla pacjentów
- **Monitowanie statusu** - śledzenie historii recept i stanu leczenia pacjentów
- **Profil lekarza** - aktualizacja danych kontaktowych i specjalizacji
- **Dostęp do danych** - szybki podgląd informacji o pacjencie

### Moduł Pacjenta
- **Historia recept** - przeglądanie wszystkich aktualnych i historycznych recept
- **Śledzenie statusu** - monitorowanie statusu wystawionych recept
- **Dokumentacja medyczna** - dostęp do pełnej dokumentacji medycznej
- **Profil pacjenta** - aktualizacja danych kontaktowych
- **Historia leczenia** - chronologiczny przegląd całego procesu leczenia

## Stack Techniczny

### Frontend
- React 18 - biblioteka do budowy interfejsu użytkownika
- React Router v6 - zarządzanie nawigacją
- Tailwind CSS - stylizacja komponentów
- Lucide React - ikony
- Komponenty funkcyjne z React Hooks

### Backend
- Java 17 - język programowania
- Spring Boot 3.2.2 - framework do tworzenia API RESTful
- Spring Data JPA - dostęp do danych
- Microsoft SQL Server - baza danych
- Lombok - redukcja boilerplate kodu
- JWT - autoryzacja i uwierzytelnianie

## Wymagania Systemowe

- **Java 17** lub nowsza
- **Microsoft SQL Server** (uruchomiony)
- **Node.js 16+** i **npm 7+**
- **Maven 3.6+**

## Instalacja i Uruchomienie

### 1. Konfiguracja Bazy Danych

Edytuj plik `back-end-medmanager/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=medmanager
spring.datasource.username=sa
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.jpa.hibernate.ddl-auto=update
```

### 2. Uruchomienie Backendu

```bash
cd back-end-medmanager
mvnw.cmd spring-boot:run
```

Backend będzie dostępny na: `http://localhost:8080`

### 3. Uruchomienie Frontendu

```bash
cd fornt-end-medmanager
npm install
npm start
```

Frontend będzie dostępny na: `http://localhost:3000`

## Architektura Aplikacji

```
MedManager/
├── back-end-medmanager/        # Backend Java/Spring Boot
│   ├── src/main/java/          # Kod źródłowy
│   ├── src/main/resources/     # Konfiguracja
│   └── pom.xml                 # Zależności Maven
├── fornt-end-medmanager/       # Frontend React
│   ├── src/                    # Komponenty React
│   ├── public/                 # Pliki statyczne
│   └── package.json            # Zależności npm
└── docker-compose.yml          # Konfiguracja Docker
```

## Funkcje Bezpieczeństwa

- **Autentykacja JWT** - bezpieczne logowanie użytkowników
- **System ról** - rozdzielenie uprawnień dla lekarzy i pacjentów
- **CORS** - ograniczenie dostępu do API z autoryzowanych źródeł
- **Walidacja danych** - weryfikacja na backendzie

## Struktura Katalogów

### Backend - `back-end-medmanager/`
```
back-end-medmanager/
├── src/main/
│   ├── java/com/example/backendmedmanager/
│   │   ├── controller/      # REST API endpointy
│   │   ├── service/         # Logika biznesowa
│   │   ├── repository/      # Dostęp do bazy danych
│   │   ├── entity/          # Modele JPA
│   │   ├── dto/             # Data Transfer Objects
│   │   └── config/          # Konfiguracja aplikacji
│   └── resources/
│       └── application.properties  # Konfiguracja bazy danych
├── pom.xml                  # Zależności Maven
└── mvnw / mvnw.cmd         # Maven wrapper
```

### Frontend - `fornt-end-medmanager/`
```
fornt-end-medmanager/
├── src/
│   ├── components/          # Komponenty React
│   │   ├── LoginForm.js     # Formularz logowania
│   │   ├── DoctorDashboard.js   # Panel lekarza
│   │   ├── PatientDashboard.js  # Panel pacjenta
│   │   ├── PatientDetails.js    # Szczegóły pacjenta
│   │   ├── Sidebar.js       # Menu boczne
│   │   └── BackButton.js    # Przycisk cofania
│   ├── App.js              # Główny komponent
│   ├── index.js            # Punkt wejścia
│   └── index.css           # Style globalne
├── public/                 # Pliki statyczne
├── package.json            # Zależności npm
├── tailwind.config.js      # Konfiguracja Tailwind CSS
└── postcss.config.js       # Konfiguracja PostCSS
```

## Komendy Kompilacji i Uruchomienia

### Frontend

**Tryb Deweloperski:**
```bash
cd fornt-end-medmanager
npm install
npm start
```
Dostęp: `http://localhost:3000`

**Produkcja:**
```bash
cd fornt-end-medmanager
npm install
npm run build
```
Pliki skompilowane w: `build/`

**Dostępne komendy npm:**
```bash
npm start       # Serwer deweloperski
npm run build   # Kompilacja produkcyjna
npm test        # Testy
```

### Backend

**Kompilacja i uruchomienie:**
```bash
cd back-end-medmanager
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```
Dostęp: `http://localhost:8080`

**Dostępne komendy Maven:**
```bash
mvnw.cmd clean          # Czyszczenie projektu
mvnw.cmd compile        # Kompilacja
mvnw.cmd test           # Testy
mvnw.cmd package        # Budowanie JAR
mvnw.cmd spring-boot:run   # Uruchomienie
```

### Docker Compose

Uruchomienie całej aplikacji w kontenerach:
```bash
docker-compose up --build
```

## Rozwiązywanie Problemów

### Frontend

**Problem: `npm: command not found`**
- Zainstaluj Node.js z https://nodejs.org/

**Problem: Port 3000 już w użyciu**
```bash
# Windows
set PORT=3001 && npm start

# Linux/macOS
PORT=3001 npm start
```

**Problem: Uszkodzony folder `node_modules`**
```bash
rm -r node_modules
npm install
```

### Backend

**Problem: `Connection refused` - baza danych niedostępna**
- Sprawdź czy SQL Server jest uruchomiony
- Zweryfikuj dane dostępu w `application.properties`
- Upewnij się że baza danych istnieje

**Problem: `JAVA_HOME` nie ustawiony**
```bash
# Sprawdź gdzie jest Java
where java

# Ustaw zmienną środowiskową
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
```

**Problem: Port 8080 już zajęty**
```properties
# W application.properties
server.port=8081
```

**Problem: Kompilacja nie powiodła się**
```bash
# Czyść cache Maven
mvnw.cmd clean
mvnw.cmd compile
```

## Uruchomienie Całej Aplikacji

### Opcja 1: Oddzielne Terminale
```bash
# Terminal 1 - Backend
cd back-end-medmanager
mvnw.cmd spring-boot:run

# Terminal 2 - Frontend
cd fornt-end-medmanager
npm install
npm start
```

### Opcja 2: Docker Compose
```bash
docker-compose up --build
```

## Wymagania dla Deweloperów

- Git
- IDE do Java (IntelliJ IDEA, Eclipse)
- IDE do JavaScript (VS Code, WebStorm)
- Narzędzia do debugowania przeglądarki

## Flagi Konfiguracji

### application.properties - Backend

```properties
# Baza danych
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=medmanager
spring.datasource.username=sa
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServer2019Dialect

# Port
server.port=8080

# Logging
logging.level.root=INFO
```

## Struktura Projektu - Całe Drzewo

```
MedManager/
├── back-end-medmanager/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/backendmedmanager/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   ├── config/
│   │   │   │   └── BackEndMedmanagerApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── fornt-end-medmanager/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackButton.js
│   │   │   ├── DoctorDashboard.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginForm.js
│   │   │   ├── PatientDashboard.js
│   │   │   ├── PatientDetails.js
│   │   │   └── Sidebar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Przepływ Aplikacji

1. **Logowanie użytkownika** - formularz LoginForm pobiera dane i wysyła do backendu
2. **Weryfikacja JWT** - backend generuje token dla zalogowanego użytkownika
3. **Routing** - na podstawie roli (Lekarz/Pacjent) system kieruje do odpowiedniego dashboardu
4. **Pobieranie danych** - komponenty dashboardu komunikują się z API backendu
5. **Wyświetlanie UI** - React renderuje dane z backendu przy pomocy komponentów
6. **Akcje użytkownika** - każda akcja (recepty, profil) wysyła zapytanie do backendu
7. **Aktualizacja bazy danych** - backend przetwarza żądania i aktualizuje bazę danych

## Licencja

MIT

