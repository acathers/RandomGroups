let roster = [];
$.get('resources/roster', function (data) {
    roster = data.split('\n');
}).done(() => generateGroups(roster, 3));


function generateGroups(roster, groupSize) {
    let groups = [];
    balanceArray(chunk(shuffle(roster), groupSize)).forEach(e => groups.push(e.join("\n")));
    generateRows(groups);
}

function shuffle(array) {
    let i = array.length;
    while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
}

function balanceArray(group) {
    let lastIndex = group.length - 1;
    let start = lastIndex - 1;
    while (group[lastIndex].length < group[0].length - 1) {
        group[lastIndex].push(group[start].splice(-1, 1).toString());
        if (start === 0) {
            start = lastIndex - 1;
        } else {
            start--;
        }

    }

    return group;
}

function chunk(array, size) {
    let chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

function generateRows(data) {
    let rightSide = document.querySelector('.right');
    let i = 1;
    let percent = 99 / data.length;
    for (let group of data) {
        let row = document.createElement('span');
        row.style.height = percent + "%";
        row.className = 'row';
        let text = document.createElement('b');
        text.innerText = "Group " + i++ + '\n\n' + group;
        row.appendChild(text);
        rightSide.appendChild(row);
    }
}

$("button").click(function () {
    let size = parseInt($("input").val());
    if ((size < 1 || isNaN(size)) || size >= roster.length / 2) {
        alert("Invalid input for group size");
    } else {
        $(".right").empty();
        generateGroups(roster, size);
    }
});




