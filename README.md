## Introduction 
`ttmlToWebVttConverter` converts [TTML][ttml-w3] captioning files to the [WebVTT][webvtt-ref] format.

## Example

Should transform this
```xml
<tt xmlns="http://www.w3.org/ns/ttml" xmlns:tts="http://www.w3.org/2006/04/ttaf1#styling" lang="no">
  <head>
    <styling>
      <style id="italic" tts:fontStyle="italic" />
      <style id="left" tts:textAlign="left" />
      <style id="center" tts:textAlign="center" />
      <style id="right" tts:textAlign="right" />
    </styling>
  </head>
  <body>
    <div>
      <p begin="00:00:00.000" dur="00:00:00.000">Copyright (C) NRK</p>
      <p begin="00:00:08.200" dur="00:00:06.660" style="left">-Jeg er ikke middagen din!<br />-Jeg vet ikke hvem jeg er.</p>
      <p begin="00:00:15.160" dur="00:00:06.940" style="left">
        <span style="italic"> -Betjent Jason Stackhouse. </span>
        <br />-Hvor er du? Du må hjelpe meg.</p>
      <p begin="00:00:22.400" dur="00:00:04.220" style="left">Takk, åndefar,<br />for at du skjenker oss nytt liv.</p>
  	</div>
  </body>
</tt>
```

Into this
```
WEBVTT

00:00:00.000 ---> 00:00:00.000
Copyright (C) NRK

00:00:08.200 ---> 00:00:14.860
-Jeg er ikke middagen din!
-Jeg vet ikke hvem jeg er.

00:00:15.160 ---> 00:00:22.100
<i>-Betjent Jason Stackhouse.</i>
-Hvor er du? Du må hjelpe meg.

00:00:22.400 ---> 00:00:26.620
Takk, åndefar,
for at du skjenker oss nytt liv.
```

## ToDo
 * Better example files
 * Alignment
 * Positioning
 * Size and Color
 * Classes

[ttml-w3]: http://www.w3.org/TR/ttaf1-dfxp/
[webvtt-ref]:http://dev.w3.org/html5/webvtt/