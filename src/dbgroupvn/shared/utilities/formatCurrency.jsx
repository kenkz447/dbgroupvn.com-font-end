import replace from 'lodash/replace'

export default function formatCurrency(pnumber) {
    return replace(pnumber, /(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}