import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/user";
import {
  findCollaborationByDBId,
  findCollaborationInviteCount,
} from "@/lib/db/collaboration";

// /invite/:id 邀请页调用，查询此邀请详细信息，不需要登录，点击“加入协作”后才需要鉴权
export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        code: 403,
        msg: "Empty roomId",
        data: null,
      });
    }

    const res = await findCollaborationByDBId(id);
    if (res) {
      return NextResponse.json({
        code: 200,
        msg: "Successed!",
        data: res,
      });
    }

    return NextResponse.json({
      code: 404,
      msg: "Not joined the collaboration space",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const dynamic = "force-dynamic";
