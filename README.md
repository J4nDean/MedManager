# MedManager

## Opis Projektu

MedManager to kompleksowa aplikacja internetowa zaprojektowana do usprawnienia zarządzania receptami w placówkach medycznych. System oferuje zintegrowane rozwiązanie dla lekarzy i pacjentów, umożliwiając efektywne zarządzanie dokumentacją medyczną oraz zapewniając bezpieczny dostęp do historii leczenia.

## Funkcjonalność Systemu

System został podzielony na dwa główne moduły, dostosowane do potrzeb różnych grup użytkowników:

Moduł Lekarza umożliwia kompleksowe zarządzanie pacjentami, w tym przeglądanie pełnej listy przypisanych pacjentów, wystawianie i modyfikowanie recept oraz monitorowanie historii leczenia. Lekarze mają również możliwość aktualizacji swoich danych kontaktowych oraz specjalizacji.

Moduł Pacjenta zapewnia dostęp do osobistej dokumentacji medycznej, w tym aktualnych i historycznych recept. Pacjenci mogą na bieżąco śledzić status swoich recept oraz aktualizować dane kontaktowe. System zapewnia chronologiczny podgląd całej historii leczenia.

## Architektura Techniczna

### Frontend
System wykorzystuje nowoczesne technologie do budowy interfejsu użytkownika:
- React 18 jako główna biblioteka interfejsu użytkownika
- React Router do zarządzania nawigacją
- Tailwind CSS do stylizacji komponentów
- Architektura oparta na komponentach funkcyjnych z wykorzystaniem React Hooks

### Backend
Warstwa serwerowa została zbudowana w oparciu o:
- Java 17
- Spring Boot do tworzenia API
- Spring Data JPA do obsługi warstwy dostępu do danych
- Microsoft SQL Server jako system zarządzania bazą danych
- Lombok do redukcji boilerplate kodu

## Instrukcja Uruchomienia

### Przygotowanie Środowiska

Do uruchomienia systemu wymagane jest:
1. Java w wersji 17
2. Microsoft SQL Server
3. Node.js do uruchomienia środowiska deweloperskiego React

### Konfiguracja i Uruchomienie

Konfiguracja Bazy Danych:
1. Przygotuj instancję Microsoft SQL Server
2. Skonfiguruj połączenie w pliku application.properties projektu backendowego

Uruchomienie Backendu:
```bash
cd backend
./mvnw spring-boot:run
```

Uruchomienie Frontendu:
```bash
cd frontend
npm install
npm start
```

Po wykonaniu powyższych kroków, aplikacja będzie dostępna pod adresem http://localhost:3000.

## Bezpieczeństwo

System implementuje następujące mechanizmy bezpieczeństwa:
- Autoryzacja oparta na tokenach JWT
- System ról użytkowników (Lekarz/Pacjent)
- Konfiguracja CORS dla bezpieczeństwa komunikacji między frontendem a backendem

## Licencja

Projekt jest udostępniony na licencji MIT.
