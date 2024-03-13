package com.vsdisp.tabletframeee.actbase.model

import android.os.Parcel
import android.os.Parcelable

/**
 * Abstract Payload
 *
 * 추가 적인 것 혹은 그외에 사항 들이 있다면 상황에 맞게 ADD
 */
data class ActParcelMultiTypeExtraData(
    var idx: String,
    var url: String,
    var type: String,
    var ctType: String,
    var path: String,
    var page: String,
) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(idx)
        parcel.writeString(url)
        parcel.writeString(type)
        parcel.writeString(ctType)
        parcel.writeString(path)
        parcel.writeString(page)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ActParcelMultiTypeExtraData> {
        override fun createFromParcel(parcel: Parcel): ActParcelMultiTypeExtraData {
            return ActParcelMultiTypeExtraData(parcel)
        }

        override fun newArray(size: Int): Array<ActParcelMultiTypeExtraData?> {
            return arrayOfNulls(size)
        }
    }
}
