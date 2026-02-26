import yaml from 'yaml'
import tc2sc from "./tc2sc.js"

let tran = (obj) => {
    let s = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object") {
            s[key] = tran(value);
        } else {
            s[key] = tc2sc(value);
        }
    });
    return s;
};

let merge = (to, from) => {
    Object.entries(from).forEach(([key, value]) => {
        if (typeof value === "object") {
            if (!to[key]) {
                to[key] = {};
            }
            to[key] = merge(to[key], value);
        } else {
            to[key] = value;
        }
    });
    return to;
}


export default function (options) {

    return {
        name: "tc2sc",
        enforce: 'pre',
        transform(code, id) {

            if (id.includes("node_modules")) {
                return;
            }

            const [filename, rawQuery] = id.split(`?`, 2)
            const query = rawQuery ? new URLSearchParams(rawQuery) : null

            if (!query) {
                return;
            }

            //check type is i18n
            if (query.get('type') !== 'i18n') {
                return
            }


            if (query.has('lang.json')) {

                let data = JSON.parse(code);

                if (!data.tc) {
                    return code;
                }

                //convert tra to simplified chinese
                let sc = Object.assign({}, data.sc ?? {});

                let d = tran(data.tc)
                sc = merge(d, sc);

                data.sc = d;

                return {
                    code: JSON.stringify(data)
                }
            }

            if (query.has('lang.yml') || query.has('lang.yaml')) {
                let data = yaml.parse(code);

                if (!data.tc) {
                    return code;
                }

                //convert tra to simplified chinese
                let sc = Object.assign({}, data.sc ?? {});

                let d = tran(data.tc)
                sc = merge(d, sc);

                data.sc = d;

                return {
                    code: yaml.stringify(data)
                }
            }



        }
    }
}

module.exports.default = module.exports