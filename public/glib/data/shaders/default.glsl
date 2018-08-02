#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat4 u_mvp;

  out vec2 texcoord;
  out vec3 heh;

  void main () {
    heh = a_normal * a_tangent * a_bitangent;
    texcoord = a_texcoord;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;

  in vec2 texcoord;

  uniform sampler2D u_colortexture;
  uniform sampler2D u_normaltexture;
  uniform sampler2D u_speculartexture;

  out vec4 outColor;
  void main () {
    vec3 finalcolor = vec3(1.0, 1.0, 1.0);
    #if defined (COLORMAP)
      finalcolor *= texture(u_colortexture, texcoord).rgb;
    #else
      finalcolor *= vec3(1.0, 0.0, 0.0);
    #endif
    vec3 heh = texture(u_normaltexture, texcoord).rgb * texture(u_speculartexture, texcoord).rgb;
    outColor = vec4(finalcolor, 1.0);
  }
#endif