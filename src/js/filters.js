/**
 * @param {Move[]} moves
 * @param {Object} filters
 * @return {Move[]}
 */
export function filterMoveList(moves, filters) {
    return moves.filter(function(move) {
        let moveString = move.getString();
        console.log(moveString);
        let includeMove = true;

        if (filters.moveName) {
            includeMove = includeMove && move.getName().toLowerCase().match(filters.moveName.toLowerCase());
        }

        if (filters.moveString) {
            includeMove = includeMove && encodeURIComponent(moveString).match(encodeURIComponent(filters.moveString));
        }

        if (filters.specialProperties.spin) {
            includeMove = includeMove && move.hasSpin();
        }

        if (filters.specialProperties.armor) {
            includeMove = includeMove && move.hasArmor();
        }

        if (filters.specialProperties.track) {
            includeMove = includeMove && move.hasTracking();
        }

        if (!isNaN(filters.frameProperties.start.value)) {
            includeMove = includeMove && compare(
                move.getStartUpFrames(),
                filters.frameProperties.start.value,
                filters.frameProperties.start.comparison
            );
        }

        if (!isNaN(filters.frameProperties.block.value)) {
            includeMove = includeMove && compare(
                move.getBlockFrames(),
                filters.frameProperties.block.value,
                filters.frameProperties.block.comparison
            );
        }

        if (!isNaN(filters.frameProperties.hit.value)) {
            includeMove = includeMove && compare(
                move.getAdvantageFrames(),
                filters.frameProperties.hit.value,
                filters.frameProperties.hit.comparison
            );
        }

        return includeMove;
    });
}

function compare(value1, value2, operator) {
    switch (operator) {
        case '<=':
            return value1 <= value2;
        case '<':
            return value1 < value2;
        case '>=':
            return value1 >= value2;
        case '>':
            return value1 > value2;
        default:
            return value1 == value2;
    }
}
