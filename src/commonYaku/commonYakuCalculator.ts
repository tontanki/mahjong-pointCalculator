import { Mentsu } from '@types*';
import { Haishi } from 'src/haishi/Haishi';
import { Brow } from 'src/types/Brow';
import { isJuntyan } from './yaku/juntyan';
import { isChinitsu } from './yaku/chinitsu';
import { isYakuhai } from './yaku/yakuhai';
import { isSyosangen } from './yaku/syosangen';
import { isHonitsu } from './yaku/honitsu';
import { isHonroutou } from './yaku/honroutou';
import { isTyanta } from './yaku/tyanta';
import { isIpeko } from './yaku/ipeko';
import { isRyanpeko } from './yaku/ryanpeko';
import { isSanankou } from './yaku/sanankou';
import { isPinfu } from './yaku/pinfu';
import { isTanyao } from './yaku/tanyao';
import { isSansyokudoukoku } from './yaku/sansyokudoukoku';
import { isToitoi } from './yaku/toitoi';
import { isIkkitsukan } from './yaku/ikkitsukan';

export const commonYakuCalculator = (
    haishi: Haishi,
    mentsu: Mentsu[],
    grandBrow: Brow,
    playerBrow: Brow,
    isRichi: boolean
) => {
    const result: { name: string; point: number }[] = [];

    if (isRichi) result.push({ name: '立直', point: 1 });
    if (haishi.getAgariType() === 'ツモ')
        result.push({ name: '門前清自摸和', point: 1 });

    // 字牌の有無
    if (haishi.getTileTypeSum('z') === 0) {
        if (isChinitsu(haishi)) result.push({ name: '清一色', point: 6 });
        if (isJuntyan(mentsu)) result.push({ name: '純全帯幺九', point: 3 });
    } else {
        result.push(...isYakuhai(haishi, grandBrow, playerBrow));
        if (isHonroutou(haishi)) result.push({ name: '混老頭', point: 2 });
        else if (isTyanta(mentsu))
            result.push({ name: '混全帯么九', point: 2 });
        if (isSyosangen(haishi)) result.push({ name: '小三元', point: 2 });
        if (isHonitsu(haishi)) result.push({ name: '混一色', point: 3 });
    }
    if (isRyanpeko(mentsu)) result.push({ name: '二盃口', point: 3 });
    else if (isIpeko(mentsu)) result.push({ name: '一盃口', point: 1 });

    if (isSanankou(mentsu, haishi)) result.push({ name: '三暗刻', point: 2 });
    if (isPinfu(mentsu, haishi, grandBrow, playerBrow))
        result.push({ name: '平和', point: 1 });

    if (isTanyao(haishi)) result.push({ name: '断么九', point: 1 });
    if (isSansyokudoukoku(mentsu)) result.push({ name: '三色同刻', point: 2 });
    if (isToitoi(mentsu)) result.push({ name: '対々和', point: 2 });
    if (isIkkitsukan(mentsu)) result.push({ name: '一気通貫', point: 2 });

    return result;
};
