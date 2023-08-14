import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    const request = await req.formData();
    const body: Record<string, string | Blob> = {};
    const avatarFile = request.get('avatar');

    console.log(request)

    // request.forEach((value, name) => {
    //     if (name !== 'avatar') {
    //       if (typeof value === 'string') {
    //         body[name] = value;
    //       } else if (value instanceof Blob) {
    //         body[name] = value;
    //         if (name === 'avatar') {
    //           avatarFile = value;
    //         }
    //       }
    //     }
    //   });

    console.log(avatarFile)

    // if(!body.phone || !body.fullName || !body.password || !body.email || !body.address ) {
    //     return NextResponse.error();
    // }

    
    const pictureUploadResponse = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${process.env.STRAPI_USERS_SECRET}`
        },
        body: avatarFile,

    })

    console.log(pictureUploadResponse)

    // const registerResponse = axios.post(
    //     `${process.env.STRAPI_URL}/api/auth/local/register`,{
    //         address: body.address,
    //         username: body.email.split('@')[0],
    //         phone: body.phone,
    //         email: body.email,
    //         password: body.password,
    //         name: body.fullName,
    // },{
    //     'headers': {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${process.env.STRAPI_USERS_SECRET}`,
    //     },
    // })
    // .then((response) => {
    //     return response.data;
    // })

    return NextResponse.json({
        res: "Hello " + body.name,
        // strapi: registerResponse,
        ok: true,
        body: body,
    });
}