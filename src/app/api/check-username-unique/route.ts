import dbConnect from "@/lib/dbconnect";
import {z}  from 'zod';
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { userValidation } from "@/schemas/signupSchema";
//if we use zod then import and useschema
