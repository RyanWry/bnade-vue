/**
 * Created by Administrator on 2016/9/8 0008.
 */

import realms from '../realm';
import itemBonus from '../itemBonus';
import moment from 'moment';

exports.realmName = (realmId) => {
    var index = 0;
    while (++index < realms.length) {
        if (realms[index].id == realmId) {
            return realms[index].connected
        }
    }
    return '未知'
};

exports.priceFormat = (price)=> {
    return parseInt(price / 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.dateFormat = (timestamp)=> {
    if (!timestamp) return '';
    return moment(timestamp).format('MM-DD HH:mm')
};

exports.timeLeft = (str) => {
    var desc = '未知';
    if (str == 'VERY_LONG') {
        desc = '非常长'
    } else if (str == 'LONG') {
        desc = '长'
    }
    return desc;
};

exports.bonus = (bl) => {
    return itemBonus[bl]
};