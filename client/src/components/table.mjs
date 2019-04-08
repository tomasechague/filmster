import { h, createElement } from '../core/render.mjs';

function generateHeader(headers) {
    const ths = headers.map(function (header) {
        return h('th', {}, header.label);
    })

    const thead = h('thead', {}, h('tr', {}, [
        h('th'),
        ...ths
    ]))

    return createElement(thead)
}

function generateBody(headers, rows) {
    const trs = rows.map(function (row) {
        const dataset = {}

        const tds = headers.map(function (header) {
            const { label, field } = header
            const cell = row[field]

            dataset['data-' + field] = cell;

            return h('td', { 'data-label': label }, cell)
        })

        const check = h(
            'td',
            {},
            h('input', { type: 'checkbox', ...dataset })
        )

        return h('tr', {}, [
            check,
            ...tds
        ])
    })

    const tbody = h('tbody', {}, trs)
    return createElement(tbody)
}

function render($el, config) {
    const { header, data, onSelectRow } = config
    const $header = generateHeader(header)
    const $body = generateBody(header, data)

    const $fragment = document.createDocumentFragment()
    $fragment.append($header)
    $fragment.append($body)

    $el.append($fragment)
}

function init(el, config) {
    const $el = document.querySelector(el)
    render($el, config)

    let selectedRows = []

    const {
        onSelectedRows = () => {},
        onDeselectedRow = () => {}
    } = config

    $el.addEventListener('click', function (e) {
        if (e.target.nodeName === 'INPUT') {
            const isSelected = e.target.checked
            const toggleRow = Object.assign({}, e.target.dataset)

            if (isSelected) {
                selectedRows = [...selectedRows, toggleRow]

                config.onSelectedRow(toggleRow)
            } else {
                selectedRows = selectedRows.filter(function (row) {
                    return row.title !== toggleRow.title
                })

                config.onDeselectedRow(toggleRow)
            }
        }
    });

    function getSelectedRows() {
        return selectedRows
    }

    return {
        getSelectedRows
    }
}

export default {
    init
}
