const fetch = require('node-fetch')
const startServer = require('../../server/src/index.js')

async function getText(element) {
    return page.evaluate(element => element.textContent, element);
}

async function isVisible(element) {
    if (typeof element === 'string') {
        element = await page.$(element);
    }

    return page.evaluate(element => {
        return element.offsetWidth > 0 && element.offsetHeight > 0;
    }, element);
}

let server, baseURL;

beforeEach(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}`
    await page.goto(baseURL);
})

afterEach(async () => {
    server.close();
})

// ----- TEST ---------
test('El titulo debería ser Filmster', async () => {
    await expect(page.title()).resolves.toMatch('Filmster');
})

test('El modal de agregar película debería iniciar oculto', async () => {
    const visibility = await isVisible('#modal');
    expect(visibility).toBe(false);
})

test('Debería renderizar la tabla de películas', async () => {
    // $ es como querySelector

    const table = await page.$('table#movies');
    expect(table).not.toBe(null);
})

test('Debería renderizar boton agregar', async () => {
    // $ es como querySelector
    const agregarBtn = await page.$('.card-header-actions button:nth-child(1)');
    // Me fijo que el boton exista
    expect(agregarBtn).not.toBe(null);
    const text = await getText(agregarBtn);
    expect(text).toBe('Agregar');
})

test('La tabla debería iniciar sin datos', async () => {
    // $$ es como querySelectorAll
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(0);
})

test('La tabla debería mostrar los datos cargados en la db', async () => {
    const movie = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    await fetch(`${baseURL}/api/v1/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    await page.reload();
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(1);

    const title = await page.$eval('table#movies tbody tr td:nth-child(2)', el => el.innerText);
    expect(title).toBe(movie.title);
})

test('Se debería poder seleccionar una película', async () => {
    const movie = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    await fetch(`${baseURL}/api/v1/movies`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    await page.reload();
    const rows = await page.$$('table#movies tbody tr');

    expect(rows.length).toBe(1);

    await page.$eval('table#movies tbody tr td:nth-child(1) input', firstCheck => firstCheck.click());
    const selectedRows = await page.evaluate(() => window.table.getSelectedRows());
    expect(selectedRows.length).toBe(1);
    expect(selectedRows[0].title).toBe(movie.title);
})

