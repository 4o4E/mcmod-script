// ==UserScript==
// @name         mcmod-script
// @namespace    https://github.com/4o4E/mcmod-script
// @version      1.0.0
// @description  还原mcmod跳转链接
// @author       404E
// @match        https://www.mcmod.cn/class/*.html
// @icon         https://www.mcmod.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const rule = [
        [/https:\/\/www\.curseforge\.com\/minecraft\/mc\-mods\/(?<id>[^\/]+).*/i, "https://www.curseforge.com/minecraft/mc-mods/{id}/files"],
        [/https:\/\/minecraft\.curseforge\.com\/projects\/(?<id>[^\/]+).*/i, "https://www.curseforge.com/minecraft/mc-mods/{id}/files"],
        [/https:\/\/modrinth\.com\/mod\/(?<id>[^\/]+).*/i, "https://modrinth.com/mod/{id}/versions"],
        [/https:\/\/github\.com\/(?<id>[^\/]+\/[^\/]+).*/i, "https://github.com/{id}/releases"],
    ];
    $(document).ready(() => {
        $(".common-link-frame li > a").each((_, e) => {
            let obj = $(e);
            let url = Base64.decode(obj.attr("href").split("//link.mcmod.cn/target/")[1].replace("@", "/"));

            // 特殊匹配
            for (const arr of rule) {
                let matcher = arr[0].exec(url);
                if (matcher != null) {
                    obj.attr("href", arr[1].replace("{id}", matcher.groups.id));
                    return
                }
            }

            // 普通匹配
            obj.attr("href", url);
        });
    });
})();