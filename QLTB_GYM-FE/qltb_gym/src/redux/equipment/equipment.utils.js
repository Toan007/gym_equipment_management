import date from 'date-and-time';

export const deleteEquip = (equips, id) => {
    return [...equips.filter(equip => equip.id != id)]
}

export const fetchEquip = (equips) => {
    return [...equips.map(e => ({ ...e, warranty: date.addMonths(new Date(e.rcp_date), e.warranty), rcp_date: e.rcp_date }))]
}