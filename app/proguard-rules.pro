# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile
# coroutine
-keepnames class kotlinx.** { *; }
-dontwarn org.jetbrains.kotlinx.**
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}

# androidX
-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**
-dontnote com.google.android.material.**

-keep class androidx.** { *; }
-keep interface androidx.** { *; }

-dontnote android.support.**
-dontnote androidx.**
-dontwarn android.support.**
-dontwarn androidx.**
-dontwarn android.support.v4.**

# androidx crypto relative with libraries
-keep class com.google.crypto.tink.** { *; }
-keep class androidx.security.** { *; }
-keep class net.oqee.core.services.** { *; }
-keep class com.google.crypto.** { *; }

# coroutine
-keepnames class kotlinx.** { *; }
-dontwarn org.jetbrains.kotlinx.**
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}
-keep class kotlinx.coroutines.android.AndroidExceptionPreHandler
-keep class kotlinx.coroutines.android.AndroidDispatcherFactory
-keep class androidx.annotation.Keep
-keep @androidx.annotation.Keep class * {*;}
-keepclasseswithmembers class * {
    @androidx.annotation.Keep <methods>;
}
-keepclasseswithmembers class * {
    @androidx.annotation.Keep <fields>;
}
-keepclasseswithmembers class * {
    @androidx.annotation.Keep <init>(...);
}
#OKHttp3 Proguard
-keepattributes Signature
-keepattributes Annotation
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**
-dontnote okhttp3.**, okio.**, retrofit2.**
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }

# Glide
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep class * extends com.bumptech.glide.module.AppGlideModule {
 <init>(...);
}
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
-keep class com.bumptech.glide.load.data.ParcelFileDescriptorRewinder$InternalRewinder {
  *** rewind();
}
# Prevent proguard from stripping interface information from TypeAdapterFactory,
# JsonSerializer, JsonDeserializer instances (so they can be used in @JsonAdapter)
-keep class * extends com.google.gson.TypeAdapter
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer
#RetroFit
# Retrofit does reflection on generic parameters. InnerClasses is required to use Signature and
# EnclosingMethod is required to use InnerClasses.
-keepattributes Signature, InnerClasses, EnclosingMethod

# Retrofit does reflection on method and parameter annotations.
-keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations

# Prevent R8 from leaving Data object members always null
-keepclassmembers,allowobfuscation class * {
  @com.google.gson.annotations.SerializedName <fields>;
}

# Retain service method parameters when optimizing.
-keepclassmembers,allowshrinking,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}
-dontwarn retrofit2.KotlinExtensions
# Retain generic signatures of TypeToken and its subclasses with R8 version 3.0 and higher.
-keep,allowobfuscation,allowshrinking class com.google.gson.reflect.TypeToken
-keep,allowobfuscation,allowshrinking class * extends com.google.gson.reflect.TypeToken
# Ignore annotation used for build tooling.
#-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement

# Ignore JSR 305 annotations for embedding nullability information.
-dontwarn javax.annotation.**

# Guarded by a NoClassDefFoundError try/catch and only used when on the classpath.
-dontwarn kotlin.Unit

# Top-level functions that can only be used by Kotlin.
-dontwarn retrofit2.KotlinExtensions

-keep class io.reactivex.*
# Reactive Stream
-dontwarn org.reactivestreams.Publisher
-dontwarn org.reactivestreams.Subscriber
# App Initializer By Provider
-keep class androidx.startup.AppInitializer
-keep class * extends androidx.startup.Initializer
-keepnames class * extends androidx.startup.Initializer
# These Proguard rules ensures that ComponentInitializers are are neither shrunk nor obfuscated,
# and are a part of the primary dex file. This is because they are discovered and instantiated
# during application startup.
-keep class * extends androidx.startup.Initializer {
    # Keep the public no-argument constructor while allowing other methods to be optimized.
    <init>();
}

-keep public class * extends androidx.recyclerview.widget.RecyclerView$LayoutManager {
    public <init>(android.content.Context, android.util.AttributeSet, int, int);
    public <init>();
}
-keepclassmembers class androidx.recyclerview.widget.RecyclerView {
    public void suppressLayout(boolean);
    public boolean isLayoutSuppressed();
}

# Retrofit does reflection on generic parameters. InnerClasses is required to use Signature and
# EnclosingMethod is required to use InnerClasses.
-keepattributes Signature, InnerClasses, EnclosingMethod

# Retrofit does reflection on method and parameter annotations.
-keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations

# Keep annotation default values (e.g., retrofit2.http.Field.encoded).
-keepattributes AnnotationDefault

# Retain service method parameters when optimizing.
-keepclassmembers,allowshrinking,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}

# Ignore annotation used for build tooling.
# Ignore JSR 305 annotations for embedding nullability information.
-dontwarn javax.annotation.**

# Guarded by a NoClassDefFoundError try/catch and only used when on the classpath.
-dontwarn kotlin.Unit

# Top-level functions that can only be used by Kotlin.
-dontwarn retrofit2.KotlinExtensions
-dontwarn retrofit2.KotlinExtensions$*

# With R8 full mode, it sees no subtypes of Retrofit interfaces since they are created with a Proxy
# and replaces all potential values with null. Explicitly keeping the interfaces prevents this.
-if interface * { @retrofit2.http.* <methods>; }
-keep,allowobfuscation interface <1>

# Keep inherited services.
-if interface * { @retrofit2.http.* <methods>; }
-keep,allowobfuscation interface * extends <1>

# With R8 full mode generic signatures are stripped for classes that are not
# kept. Suspend functions are wrapped in continuations where the type argument
# is used.
-keep,allowobfuscation,allowshrinking class kotlin.coroutines.Continuation

# R8 full mode strips generic signatures from return types if not kept.
-if interface * { @retrofit2.http.* public *** *(...); }
-keep,allowoptimization,allowshrinking,allowobfuscation class <3>

# With R8 full mode generic signatures are stripped for classes that are not kept.
-keep,allowobfuscation,allowshrinking class retrofit2.Response

# EncryptedPreferences Libraries warns
-dontwarn com.google.api.client.http.GenericUrl
-dontwarn com.google.api.client.http.HttpHeaders
-dontwarn com.google.api.client.http.HttpRequest
-dontwarn com.google.api.client.http.HttpRequestFactory
-dontwarn com.google.api.client.http.HttpResponse
-dontwarn com.google.api.client.http.HttpTransport
-dontwarn com.google.api.client.http.javanet.NetHttpTransport$Builder
-dontwarn com.google.api.client.http.javanet.NetHttpTransport
-dontwarn com.google.errorprone.annotations.CanIgnoreReturnValue
-dontwarn com.google.errorprone.annotations.CheckReturnValue
-dontwarn com.google.errorprone.annotations.Immutable
-dontwarn com.google.errorprone.annotations.InlineMe
-dontwarn com.google.errorprone.annotations.RestrictedApi
-dontwarn javax.annotation.Nullable
-dontwarn javax.annotation.concurrent.GuardedBy
-dontwarn javax.annotation.concurrent.ThreadSafe
-dontwarn org.joda.time.Instant
-dontwarn org.joda.convert.FromString
-dontwarn org.joda.convert.ToString

#internal
-keep class com.vsdisp.tabletframeee.apis.**{*;}
-keep class com.vsdisp.tabletframeee.ui.multilist.**{*;}
-keep class com.vsdisp.tabletframeee.utils.**{*;}
-keep class com.vsdisp.tabletframeee.**{*;}