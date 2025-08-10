
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response('address is required', { status: 400 });
    }



    const url = `https://backends.phaser.bot/api/v1/token-detail/${id}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },

    });

    return Response.json(res.json(), { status: 200 });
}



