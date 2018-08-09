#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat4 u_mvp;
  uniform mat4 u_view;
  uniform mat4 u_perspectice;
  uniform mat4 u_view_inverted;
  uniform float u_time;

  out float time;
  out vec2 texcoord;
  out vec3 vertexPosition;
  out vec3 cameraPosition;
  out vec3 lightPosition;
  out vec3 normal;

  out vec3 heh;

  void main () {
    time = u_time;

    texcoord = a_texcoord;

    vertexPosition = a_position;
    cameraPosition = vec3(0.0, 0.0, 0.0);
    lightPosition = vec3(cos(time * 0.001) * 10.0, 0.0, sin(time * 0.001) * 10.0 - 10.0);
    normal = a_normal;

    heh = a_normal * a_tangent * a_bitangent;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;

  in float time;
  in vec2 texcoord;
  in vec3 vertexPosition;
  in vec3 cameraPosition;
  in vec3 lightPosition;
  in vec3 normal;
  uniform mat4 u_model;
  uniform mat3 u_model_rotation;

  uniform sampler2D u_colortexture;
  uniform sampler2D u_normaltexture;
  uniform sampler2D u_speculartexture;

  out vec4 outColor;


  #if defined (DIFFUSE)
    vec3 calculateDiffuseLight () {
      float lightDiffuseStrength = 1.0;
      vec3 lightColor = vec3(1.0, 1.0, 1.0);
      vec3 fragPosition = vec3(u_model * vec4(vertexPosition, 1.0));
      vec3 fragNormal = normalize(u_model_rotation * normal);
      vec3 fragToLight = normalize(lightPosition - fragPosition);
      float diffuse = max(dot(fragNormal, fragToLight), 0.0);
      return lightColor * diffuse * lightDiffuseStrength;
    }
  #endif


  #if defined (SPECULAR)
    vec3 calculateSpecularLight () {
      float lightSpecularStrength = 1.0;
      vec3 lightColor = vec3(1.0, 1.0, 1.0);
      vec3 fragPosition = vec3(u_model * vec4(vertexPosition, 1.0));
      vec3 fragNormal = normalize(u_model_rotation * normal);
      vec3 fragToLight = normalize(lightPosition - fragPosition);
      vec3 fragToCamera = normalize(cameraPosition - fragPosition);
      vec3 halfVector = normalize(fragToLight + fragToCamera);
      float specular = max(dot(fragNormal, halfVector), 0.0);
      return lightColor * specular * lightSpecularStrength;
    }
  #endif


  vec3 calculateLight () {
    vec3 totalLight = vec3(1.0, 1.0, 1.0);
    #if defined (DIFFUSE)
      totalLight *= calculateDiffuseLight();
    #endif
    #if defined (SPECULAR)
      totalLight *= calculateSpecularLight();
    #endif
    return totalLight;
  }


  void main () {
    vec3 finalColor = normalize(vec3(253.0, 106.0, 2.0));
    #if defined (COLORMAP)
      finalColor = texture(u_colortexture, texcoord).rgb;
    #endif
    #if defined (DIFFUSE) || defined (SPECULAR)
      finalColor *= calculateLight();
    #endif
    vec3 heh = texture(u_normaltexture, texcoord).rgb * texture(u_speculartexture, texcoord).rgb;
    outColor = vec4(finalColor, 1.0);
  }
#endif
