package com.vsdisp.tabletframeee.actbase.model

import android.os.Parcel
import android.os.Parcelable

/**
 * When Using Parcel
 */
data class ActParcelMultiTypeData(var idx: Int?, var tag: String) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readValue(Int::class.java.classLoader) as? Int, parcel.readString()!!
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(idx)
        parcel.writeString(tag)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ActParcelMultiTypeData> {
        override fun createFromParcel(parcel: Parcel): ActParcelMultiTypeData {
            return ActParcelMultiTypeData(parcel)
        }

        override fun newArray(size: Int): Array<ActParcelMultiTypeData?> {
            return arrayOfNulls(size)
        }
    }
}
