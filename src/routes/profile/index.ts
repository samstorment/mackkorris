import db from '$lib/db';

export async function get({ request }) {

    // console.log(request);

    const user = db.auth.api.getUserByCookie(request);

    console.log("USER", user);

    // if (!user) return { status: 404 };

    // let { data, error, status } = await db
    //     .from('profiles')
    //     .select('username, website, avatar_url')
    //     .eq('id', user.id);

    // if (error) throw error;

    // return { body: data }

    return {
        body: {
            username: 'sam',
            display_name: 'Sam Storment',
            avatar_url: 'https://i.imgur.com/P5bp6RY.jpeg',
            website: 'https://youtube.com/mack'
        }
    }
}