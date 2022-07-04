export function get({ locals }) {

    if (locals.user) {
        return {
            body: {},
            status: 302,
            redirect: '/'
        }
    }

    return {};
}