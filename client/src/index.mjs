import Table from './components/table.mjs'

const table = Table.init('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Pais', field: 'country' },
        { label: 'Guionistas', field: 'writers' }
    ],
    data: [
        {
            title: "Back to the Future Part II",
            description: "After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip. ",
            year: "1989",
            country: "United States",
            writers: "Robert Zemeckis, Bob Gale"
        }
    ],
    onSelectedRow: function (row) {
        console.log(table.getSelectedRows())
    },
    onDeselectedRow: function () {
        console.log(table.getSelectedRows())
    }
})
