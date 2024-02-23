<template>
    <div class="mask" v-if="props.visibel">
        <div class="result-menu" >
            <div class="result-menu-tip">{{ getPlayResult() }}</div>
            <div class="result-menu-button">
                <div class="result-menu-button-item" v-for="item in  getButtonList(store.$state.mode)"
                    @click="handleClick(item)">
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { roomStore } from '@/Stores/room';
import { IMenuItem } from '@/Types';
import { Player } from '@/Types/player';
import { GameRoomMode, GameRoomResultState } from '@/Types/room';
import EventBus from '@/Until/event-bus';
const store = roomStore();
const props = defineProps({
    visibel: {
        type: Boolean,
        default: false
    },
    player: Player,
})
const getPlayerName = () => {
    return props.player.nickName;
}
const getPlayResult = () => {
    const state = getResult(props.player);
    const str = {
        '-1': '胜败乃兵家常事,请继续努力！',
        '0': '你与对手实力相当,努努力就能战胜对手！',
        '1': '恭喜您取得胜利！'
    }
    return str[state];
}
const getResult = (player: Player) => {
    const result = store.$state.result;
    if (result.state === GameRoomResultState.DRAW) {
        return GameRoomResultState.DRAW;
    }
    if (player.id === result.player.id) {
        return result.state
    } else {
        return -result.state;
    }
}
const getButtonList = (mode: GameRoomMode) => {
    return mode === GameRoomMode.ONLINE ? getOnileButtonList(getResult(props.player)) : getStandAloneButtonList(getResult(props.player))
}
const getStandAloneButtonList = (state: GameRoomResultState) => {
    if (state === GameRoomResultState.WIN) {
        return [
            { id: 1, label: '新的开始', value: 'new' },
            { id: 3, label: '返回', value: 'back' },
        ]
    } else {
        return [
            { id: 4, label: '重新挑战', value: 'redirect' },
            { id: 3, label: '返回', value: 'back' },
        ]
    }
}
const getOnileButtonList = (state: GameRoomResultState) => {
    return [
        { id: 2, label: '再来一局', value: 'again' },
        { id: 3, label: '返回', value: 'back' },
    ]
}
const handleClick = (item: IMenuItem) => {
    EventBus.emit('resultMenu', {
        mode: store.$state.mode,
        item
    })
}
</script>
<style lang="scss" scoped>
.result-menu {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 400px;
    transform: translate(-50%, -50%);
    z-index: 2;
    background: #fff;
    display: flex;
    flex-direction: column;
    cursor: default;

    &-button {
        display: flex;

        &-item {
            flex: 1;
            padding: 16px;
            text-align: center;
            font-size: 24px;

            &:hover {
                background-color: #ccc;
                cursor: pointer;
            }
        }
    }

    &-tip {
        padding: 30px 0;
        text-align: center;
        font-size: 36px;
        flex: 1;

    }

}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    z-index: 1;
}
</style>