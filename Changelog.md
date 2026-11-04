# Changelog

All notable changes to **Animals Card** will be documented in this file.

## [Unreleased]

### Planned
- Implement answer validation and scoring for additional questions.
- Improve game progression and automatic game completion.
- Fix known gameplay and modal interaction issues.
- Improve responsive design and user experience.
## [0.4.0] - 2026-11-04

### Overview

Improved the scoring system, introduced a second question stage for animal cards, and implemented automatic game completion.

### Added
- Second-stage questions for animal cards, allowing players to earn additional points. 
- Automatic navigation to the results page when all animal cards have been used.


### Changed
- Updated the scoring system:
    15 points for correctly identifying an animal (previously 25).
    35 points for correctly answering the additional question.
    Maximum of 50 points per animal card.
- Improved game progression with a two-stage question system.

### Fixed
- Removed the need to manually finish the game after all cards have been used.


## [0.3.0] - 2026-11-03

### Overview

First documented release of Animals Card, introducing the core gameplay mechanics, animal identification, scoring system, and basic game navigation.

This release establishes the project's initial documented baseline rather than describing changes from previous versions.

### Added

**Game Setup & Navigation**
- Home page with player nickname input and game initialization.
- Support for starting the game using the Enter key.
- Player nickname transfer between pages, with `USER1234` as the default.
- Navigation between home, game, and results pages using React Router.

**Animal Cards & Gameplay**
- Collection of 10 animals with images, questions, and three answer options each.
- Game board displaying up to four animal cards simultaneously.
- Interactive card selection with visual feedback.
- Modal interface for identifying animals.
- Case-insensitive animal name validation with whitespace trimming.
- Tracking of previously used animal cards to prevent repetition.
- Card removal after closing the modal, including skipped or incorrect attempts.

**Scoring & Game Progress**
- Awarding 25 points for correctly identifying an animal.
- Prevention of repeated answer submissions within the same modal session.
- Additional question interface displayed after successful animal identification.
- Turn-skipping functionality with a 50-point penalty when cards remain on the board.
- Manual game completion.
- Results page displaying the player's nickname and final score.

### Known Limitations

- Additional questions do not yet support answer validation or scoring.
- Answer radio buttons are not yet grouped for single-choice selection.
- The game does not automatically end when all cards have been used.
- Modal closure may trigger duplicate card-removal handlers.
- Player scores can become negative.
- Game progress is lost after a page refresh.
- The `Enemy` section is currently a placeholder without opponent functionality.

### Validation

- ESLint checks passed using `npm run lint`.
- TypeScript checks passed using `npx tsc -b`.
- Production build and browser-based testing have not yet been verified.