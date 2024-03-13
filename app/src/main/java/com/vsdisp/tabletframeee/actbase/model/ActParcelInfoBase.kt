package com.vsdisp.tabletframeee.actbase.model

import android.os.Parcel
import android.os.Parcelable

/**
 * ActParcelInfoBase
 * Activity Base Info
 */
class ActParcelInfoBase(var actFrom: String, var actTo: String) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readString()!!,
        parcel.readString()!!
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(actFrom)
        parcel.writeString(actTo)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ActParcelInfoBase> {
        override fun createFromParcel(parcel: Parcel): ActParcelInfoBase {
            return ActParcelInfoBase(parcel)
        }

        override fun newArray(size: Int): Array<ActParcelInfoBase?> {
            return arrayOfNulls(size)
        }
    }
}