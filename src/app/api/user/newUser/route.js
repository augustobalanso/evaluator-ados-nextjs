import { NextResponse } from "next/server";
import { FormData } from 'formdata-node';
import { redirect } from "next/navigation";


export async function POST(req) {
    const request = await req.formData();
    const formData = {
        "username": request.get('email').split('@')[0],
        "email": request.get('email'),
        "password": request.get('password'),
        "name": request.get('fullName'),
        "phone": request.get('phone'),
        "address": request.get('address'),
    }
    const avatarFile = request.get('avatar');
    const formAvatar = new FormData();

    // if(!body.phone || !body.fullName || !body.password || !body.email || !body.address ) {
    //     return NextResponse.error();
    // }
    // 
    
    const registerResponse = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_USERS_SECRET}`,
        }),
        body: JSON.stringify(formData),

    }).then(res => res.json()
    ).then(
        async (json) => {

            if (avatarFile || !json.error) {
                formAvatar.append('files', avatarFile, avatarFile.name);
                formAvatar.append('refId', await json.user.id);
                formAvatar.append('field', 'avatar');
                formAvatar.append('ref', 'plugin::users-permissions.user');

                const imageUploadRes = await fetch(`${process.env.STRAPI_URL}/api/upload`, {
                    method: 'post',
                    headers: new Headers({
                        'Authorization': `Bearer ${process.env.STRAPI_USERS_SECRET}`,
                    }),
                    body: formAvatar,
                }).then(res => res.json())
            }
        }
    ).catch(err => NextResponse.error(err));

    // const registerResponse = await axios.post(
    //     `${process.env.STRAPI_URL}/api/auth/local/register`, form,{
    //     'headers': {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': `Bearer ${process.env.STRAPI_USERS_SECRET}`,
    //     },
    // });
    if(registerResponse?.error) {
        return NextResponse.error(registerResponse.error);
    }
    return NextResponse.json({
        status: 200,
        message: 'Register success',
        data: registerResponse,
        ok: true,
    })
}