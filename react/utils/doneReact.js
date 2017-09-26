/**
 * This is mostly so that tests know when the page is finished rendering,
 * though I suppose it could come in handy in a more general sense...
 */
module.exports = new Event('done-react');
