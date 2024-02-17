# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
* Year-by-year temperature chart. The old temperature chart is selectable through a drop-down
* Selection of min, mean and max temperature through switches in year-by-year chart
* Add pan and zoom in the x direction through mouse drag and mouse wheel to year-by-year temperature chart
* Add pan and zoom in the x direction through mouse drag and mouse wheel to temperature chart
* Color offset selection through slider to year-by-year temperature chart
* Selection of points and lines to year-by-year temperature chart
* Persistence of year-by-year temperature chart controls in browser local storage

### Changed
* Rename page to Emil's Weather Station @ bergetvidhandfatet
* Change favicon to cloudy weater
* Rework using Chart.js
* Use unique colors in year-by-year temperature chart

### Fixed
* Update bearer token
* Add missing dayjs dependency
* Update bearer token again

## [1.3.0] - 2023-06-07
### Added
* Show mean temperature with green color

### Changed
* Ensure five-degree ticks on y-axis

### Fixed
* Off by one error in date
* Text not fully visible when hovering rightmost point

## [1.2.0] - 2023-06-06
### Changed
* Show also date when hovering point

## [1.1.0] - 2023-06-06
### Added
* Time range selection, initially deployed to http://magjac.com/weather/ on 2023-05-28.

### Changed
* Show temperature when hovering point
* Move time axis to temperature=0

## [1.0.0] - 2023-06-06

### Added
 * First version, initially deployed to http://magjac.com/weather/ on 2023-05-24.

[Unreleased]: https://github.com/magjac/weather/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/magjac/weather/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/magjac/weather/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/magjac/weather/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/magjac/weather/compare/...v1.0.0
